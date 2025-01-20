---
title: "ChatGPT - How does it work!"
date: "2024-04-20"
published: true
---

**\[Note to the reader: This post looks long but is a short read. Try it.\]**

Take out your phone. Open WhatsApp, and start typing “I love”. The autocomplete on your phone will probably predict “you” as the next word. That’s it. That’s how all chat-based AIs like ChatGPT work. They predict what comes next.

Let’s go into a bit more detail.

In a chat-based AI system - there are usually two predefined roles:

1.  User
2.  AI Assistant

A conversation keeps alternating between them.

### First Message

When you send it a message:

> User: How are you?

The AI accepts the input and tries to autocomplete the reply.

> User: How are you?
>
> AI Assistant: <autocompletes here>

There is no thinking, no logic, no engines, no magic. Just autocomplete.

Prediction works like this

> User: How are you?
>
> AI Assistant: I
>
> AI Assistant: I am
>
> AI Assistant: I am doi
>
> AI Assistant: I am doing
>
> AI Assistant: I am doing we
>
> AI Assistant: I am doing well.

Here is an explanation:

> AI Assistant: I
>
> AI Assistant: I am
>
> **\[\`am\` is added because an equation inside the AI says that ‘am’ is the next most likely thing.\]**
>
> AI Assistant: I am doi
>
> _**\[\` doi\` is added because an equation inside the AI says that \`a space followed by doi\` is the next most likely thing\]**_
>
> AI Assistant: I am doing
>
> _**\[… so on, the next most likely thing is added next.\]**_
>
> AI Assistant: I am doing we
>
> AI Assistant: I am doing well.
>
> _**\[… the process continues until the equations says ‘that’s the end’\]**_

Two things result from this:

1.  You get that typing effect on AIs, where characters or words are added, one by one.
2.  You get the illusion that a human on the other side is speaking to you.

_For Geeks: The next thing predicted is neither always a character, nor a word, it is a segment of the language formally called a token. All chat based AI systems predict the next token. Examples of tokens could be - doi, ng, well,., etc._

### Second Message

When you send another message.

> User: How are you?
>
> AI Assistant: I am doing well.
>
> **User: What is the full-form of AI?**

The whole conversation - all three messages - is sent to the AI again and the autocomplete starts again.

> User: How are you?
>
> AI Assistant: I am doing well.
>
> User: What is the full-form of AI?
>
> **AI Assistant: AI stands for Artificial Intelligence.**

This is what the process looks like.

1.  You send a message.
2.  The Whole conversation is sent to the AI.
3.  AI does the completion.
4.  Go to step 1.

As I said earlier, it’s just autocomplete like your phone, but better.

### How does AI know what comes next?

The answer to that is learning; or what you would call in education lingo - cramming. The AI has gone through all the texts on the internet many times and over time it starts cramming (learning) what comes next. I call it cramming because all an AI knows is what comes next, it does not understand the meaning of your message.

When I say AI - I don’t mean a magical computer being, it is just a very very long mathematical equation that calculates the chances of what comes next. This equation is sometimes also called a model.

When you use ChatGPT free, the model (the equation) is GPT 3.5, when you purchase a paid version, you get a new, better model/equation called GPT 4.

The better the model, the better the responses.

### Customizing ChatGPT

What if you want your ChatGPT to always speak to you like “A Rapper”, or take any other role like a doctor or a scientist? How does one do that?

It is quite simple. Just insert some instructions before the chat starts.

> Instructions: Always speak to me like a rapper.
>
> ![](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4e0722ca-b815-401e-8e6f-74b9b6ec09c5_498x710.png)

You can add these instructions on the free version of ChatGPT too. Just google “how to add custom instructions to GPT”.

## What to do with this knowledge?

1.  Be careful with math: Since everything is just autocomplete, no GPT or chat-based AI can do math with 100 accuracy. All it can do is guess - what comes after 2+2=, and 99.999 times out of 100, the answer would be 4.
2.  Beware of conversation length: As the conversation gets longer, most chat-based AIs forget older messages. The newer messages are often given more priority than older messages.
3.  Add clear custom instructions: If you ask the model to be a doctor, and then ask it a medical question, the response would be better than just asking it that question directly. This happens because while answering, the AI tries to complete the sentence “As an expert doctor, I recommend that you ….”, as compared to “I am not an expert doctor, but I think…”.
4.  Don’t make typos or grammatical errors: The quality of the responses also depends on the quality of the questions. If the questions are clear, not filled with errors, and grammatically correct, there is a better chance of getting a better response.
