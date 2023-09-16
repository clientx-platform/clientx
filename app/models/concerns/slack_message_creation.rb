module SlackMessageCreation
  extend ActiveSupport::Concern

  private

  def create_message
    return unless conversation

    build_message
    @message.save!
    { status: 'success' }
  rescue Slack::Web::Api::Errors::MissingScope => e
    ClientxExceptionTracker.new(e, account: conversation.account).capture_exception
    disable_and_reauthorize
  end

  def disable_and_reauthorize
    integration_hook.prompt_reauthorization!
    integration_hook.disable
  end

  def build_message
    @message = conversation.messages.build(
      message_type: :outgoing,
      account_id: conversation.account_id,
      inbox_id: conversation.inbox_id,
      content: Slack::Messages::Formatting.unescape(params[:event][:text] || ''),
      external_source_id_slack: params[:event][:ts],
      private: private_note?,
      sender: sender
    )
    process_attachments(params[:event][:files]) if attachments_present?
  end

  def attachments_present?
    params[:event][:files].present?
  end

  def process_attachments(attachments)
    attachments.each do |attachment|
      tempfile = Down::NetHttp.download(attachment[:url_private], headers: { 'Authorization' => "Bearer #{integration_hook.access_token}" })

      attachment_params = {
        file_type: file_type(attachment),
        account_id: @message.account_id,
        external_url: attachment[:url_private],
        file: {
          io: tempfile,
          filename: tempfile.original_filename,
          content_type: tempfile.content_type
        }
      }

      attachment_obj = @message.attachments.new(attachment_params)
      attachment_obj.file.content_type = attachment[:mimetype]
    end
  end

  def file_type(attachment)
    return if attachment[:mimetype] == 'text/plain'

    case attachment[:filetype]
    when 'png', 'jpeg', 'gif', 'bmp', 'tiff', 'jpg'
      :image
    when 'pdf'
      :file
    end
  end
end