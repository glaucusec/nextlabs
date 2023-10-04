## What I learned

- RabbitMQ is a message broker. A message can be sent by the producer and a can be read by a consumer.
- The official docs was enough for learning RabbitMQ. The sample code acutally helped to write the code.

## What I did

- I thought of upon receiving the message; I could send that to fetch the required data via puppeteer.

## What went wrong

- Consuming messages upon receiving was not enough, upon receiving the link(message) I need to handle the async operation to wait before proceeding with next url.
- The default code, shows error from `event emitter of nodejs` and also having memory issues, because puppeteer instances are created.

#### Producer

```javascript
#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "hello";
    var msg = "https://play.google.com/store/apps/details?id=com.whatsapp";

    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
```

#### Consumer

```javascript
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      async function (msg) {
        console.log(msg.content.toString());

        try {
          await fetchDetails(msg.content.toString());
        } catch (error) {
          console.error("Error processing message:", error);
        } finally {
          channel.close();
          connection.close();
        }
      },
      {
        noAck: true,
      }
    );
  });
});
```
