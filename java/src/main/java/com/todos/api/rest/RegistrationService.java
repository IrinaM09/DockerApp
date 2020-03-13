package com.todos.api.rest;

import com.todos.api.model.User;
import org.apache.http.HttpHost;
import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.admin.cluster.health.ClusterHealthRequest;
import org.elasticsearch.action.admin.cluster.health.ClusterHealthResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.Priority;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentType;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

@Path("/")
public class RegistrationService {

    /**
     * Function that registers an user in Elasticsearch
     *
     * @return registered user
     */
    @Path("signup")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public static String elasticsearchRegister(User user) {
        RestHighLevelClient client;

        System.out.println("Received data: " + user.getEmail() + " " + user.getPassword());

        try {
            /* Initiate RestHighLevelClient Client */
            client = new RestHighLevelClient(
                    RestClient.builder(
                            new HttpHost("es", 9200, "http")));

            /* Verify it cluster is healthy */
            ClusterHealthRequest request = new ClusterHealthRequest()
                    .timeout(TimeValue.timeValueSeconds(50))
                    .masterNodeTimeout(TimeValue.timeValueSeconds(20))
                    .waitForEvents(Priority.NORMAL);

            /* Asynchronous listener */
            ActionListener<ClusterHealthResponse> listener =
                    new ActionListener<ClusterHealthResponse>() {
                        @Override
                        public void onResponse(ClusterHealthResponse response) {
                            System.out.println("The cluster is healthy: " + response.getStatus());
                        }

                        @Override
                        public void onFailure(Exception e) {
                            System.out.println("The cluster is unhealthy: " + e.getMessage());
                        }
                    };

            client.cluster().healthAsync(request, RequestOptions.DEFAULT, listener);

            /* Save the user in ElasticSearch users index */
            Map<String, String> map = new HashMap<>();
            map.put("password", user.getPassword());
            map.put("email", user.getEmail());


            IndexRequest indexRequest = new IndexRequest("users")
                    .id(user.getEmail())
                    .source(map, XContentType.JSON);

            IndexResponse indexResponse = client
                    .index(indexRequest, RequestOptions.DEFAULT);

            System.out.println("Response from Index \"users\": " + indexResponse);

            client.close();

        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }
        return "Success";
    }
}
