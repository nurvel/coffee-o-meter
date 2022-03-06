export const postToSlackChannel = async (
  message: string
): Promise<Response> => {
  const URL = "https://slack.com/api/chat.postMessage";

  const payload = JSON.stringify({
    channel: process.env.SLACK_CHANNEL_ID,
    text: `*Coffee is coming up!* :coffee: Here is a random fact that you can discuss over a cup of java: _"${message}"_ <!here>`,
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
