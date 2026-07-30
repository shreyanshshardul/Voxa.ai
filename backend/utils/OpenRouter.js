import "dotenv/config";

const OpenRouterApiResponse = async(message)=>{
    let option = {
    method : "POST",
    headers : {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body : JSON.stringify({
      model : "openrouter/free",
      messages: [
    { role: "user", content:message }
  ],
    })
  }
  try{
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions" , option)
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "API Error");
    }

    return data.choices[0].message.content;
  }catch(err){
    console.log(err);
  }
}

export default OpenRouterApiResponse;