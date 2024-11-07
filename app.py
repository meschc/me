from flask import Flask, jsonify
from telethon.sync import TelegramClient
from telethon.tl.functions.channels import GetFullChannel
from telethon.errors.rpcerrorlist import ChatAdminRequiredError

app = Flask(__name__)

# Замените на свои данные Telegram API
api_id = 'YOUR_API_ID'
api_hash = 'YOUR_API_HASH'
channel_username = 'YOUR_CHANNEL_USERNAME'

@app.route('/subscriber_count', methods=['GET'])
def get_subscriber_count():
    with TelegramClient('anon', api_id, api_hash) as client:
        try:
            channel = client(GetFullChannel(channel=channel_username))
            subscriber_count = channel.full_chat.participants_count
            return jsonify({'subscriber_count': subscriber_count})
        except ChatAdminRequiredError:
            return jsonify({'error': 'Access denied'}), 403

if __name__ == "__main__":
    app.run(debug=True)
