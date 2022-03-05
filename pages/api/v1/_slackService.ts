export const postToSlackChannel = async (
  message: string
): Promise<Response> => {
  const URL = "https://slack.com/api/chat.postMessage";

  const payload = JSON.stringify({
    channel: process.env.SLACK_CHANNEL_ID,
    text: `:coffee: *Fresh coffee is coming up in 5 minutes!* Here is a random fact that you can discuss over coffee: _"${message}"_`,
  });

  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SLACK_OAUTH_TOKEN}`,
    },
    body: payload,
  });
};
