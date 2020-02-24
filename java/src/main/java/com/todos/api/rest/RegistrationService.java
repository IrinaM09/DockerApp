package com.todos.api.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
public class RegistrationService {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("login")
    public String test() {
        return "Server is working!";
    }
}