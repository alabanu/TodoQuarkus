package io.todo.resources;


import io.quarkus.panache.common.Sort;
import io.todo.model.Todo;
import io.todo.model.User;
import io.todo.model.Version;
import io.todo.utils.UserUtil;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.security.Principal;

@Path("version")
@RequestScoped
@Produces("application/json")
@Consumes("application/json")
public class VersionResource {

    @Inject
    JsonWebToken jwt;

    @GET
    @RolesAllowed({"user"})
    public Response get(@Context SecurityContext ctx) {
        User user= UserUtil.getUserFromContext(ctx);
        return Response.ok(Version.listAllByUser(user,Sort.by("dueDate"))).build();
    }

    @GET
    @Path("{id}")
    @RolesAllowed({"user"})
    public Response getSingle(@Context SecurityContext ctx,@PathParam Long id) {
        Version version = Version.findById(id);
        if (version == null) {
            throw new WebApplicationException("Todo with id of " + id + " does not exist.", 404);
        }
        return Response.ok(version).build();
    }

    @POST
    @Transactional
    @RolesAllowed({"user"})
    public Response create(@Context SecurityContext ctx, Version version) {
        if (version.id != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }
        version.user= UserUtil.getUserFromContext(ctx);
        version.persist();
        return Response.ok(version).status(201).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    @RolesAllowed({"user"})
    public Response update(@Context SecurityContext ctx,@PathParam Long id, Version version) {
        if (version.title == null) {
            throw new WebApplicationException("Todo Title was not set on request.", 422);
        }

        Version entity = Version.findById(id);

        if (entity == null) {
            throw new WebApplicationException("Todo with id of " + id + " does not exist.", 404);
        }

        entity.description = version.description;

        return Response.ok(entity).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    @RolesAllowed({"user"})
    public Response delete(@Context SecurityContext ctx,@PathParam Long id) {
        Version entity = Version.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Todo with id of " + id + " does not exist.", 404);
        }
        entity.delete();
        return Response.status(204).build();
    }

    @Provider
    public static class ErrorMapper implements ExceptionMapper<Exception> {

        @Override
        public Response toResponse(Exception exception) {
            int code = 500;
            if (exception instanceof WebApplicationException) {
                code = ((WebApplicationException) exception).getResponse().getStatus();
            }
            return Response.status(code)
                    .entity(Json.createObjectBuilder().add("error", exception.getMessage()).add("code", code).build())
                    .build();
        }

    }


}