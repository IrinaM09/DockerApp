package com.todos.api;

import com.todos.api.config.CorsFilter;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.Grizzly;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;


import java.io.IOException;
import java.net.URI;
import java.util.logging.Level;

public class Main {
    /* Base URI the Grizzly HTTP is listening on */
    private static final String BASE_URI = "http://0.0.0.0:8080";

    private static final java.util.logging.Logger LOGGER = Grizzly.logger(HttpServer.class);

    private static HttpServer startServer() {
        /* Create a resource config that scans for JAX-RS and CORS policy in rest package */
        final ResourceConfig rc = new ResourceConfig()
                .packages("com/todos/api/rest")
                .register(CorsFilter.class)
                .register(JacksonFeature.class)
                .register(MultiPartFeature.class);

        /* Create and start a  grizzly http server exposing the Jersey App at BASE_URI */
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);
    }

    public static void main(String[] args) {
        final HttpServer server = startServer();

        LOGGER.log(Level.INFO, "[com.todos.api.Main] App is available at " + BASE_URI);

        /* Register shutdown hook */
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            LOGGER.info("Stopping server..");
            server.shutdownNow();
        }, "shutdownHook"));

        /* Run */
        try {
            server.start();
            Thread.currentThread().join();
        } catch (Exception e) {
            LOGGER.severe("There was an error while starting Grizzly HTTP server.");
        }
    }
}
