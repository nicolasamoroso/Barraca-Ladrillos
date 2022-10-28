const getJSONData = async (url) => await (await fetch(url)).json();

const postJSONData = async (url, data) =>
  await (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  ).json();

const deleteJSONData = async (url) =>
  await (
    await fetch(url, {
      method: "DELETE",
    })
  ).json();
