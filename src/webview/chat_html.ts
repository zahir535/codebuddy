import { chatCss } from "./chat_css"
import { chatJs } from "./chat_js"

export const chartComponent :string = `
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
<style>
${chatCss}
</style>
<title>AI</title>
</head>

<body>
<div id="chat-container">
    <div id="chat-title">ChatBuddy (Ola)</div>
    <div id="chat-messages"></div>
    <div id="chat-input-container">
        <input id="chat-input" type="text" placeholder="Ask me to explain, debug, or optimize your code" />
    </div>
    <button id="chat-send">Send</button>
    <div id="loading">
    <div class="loader"></div>
    <div class="loader"></div>
</div>
</div>
<script>
    ${chatJs}
</script>
</body>

</html>
`