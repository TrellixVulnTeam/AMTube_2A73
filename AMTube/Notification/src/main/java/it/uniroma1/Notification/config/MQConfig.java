package it.uniroma1.Notification.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MQConfig {
    public static final String QUEUE_NOTIFICATION = "notification_queue";
    public static final String EXCHANGE = "exchange";
    public static final String ROUTING_KEY_NOTIFICATION = "notification_routingKey";

    @Bean
    public Queue notificationQueue() {
        return new Queue(QUEUE_NOTIFICATION);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Binding notificationBinding(Queue notificationQueue, TopicExchange exchange) {
        return BindingBuilder
                .bind(notificationQueue)
                .to(exchange)
                .with(ROUTING_KEY_NOTIFICATION);
    }

    @Bean
    public MessageConverter messageConverter() { return new Jackson2JsonMessageConverter(); }

    @Bean
    public AmqpTemplate template(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
