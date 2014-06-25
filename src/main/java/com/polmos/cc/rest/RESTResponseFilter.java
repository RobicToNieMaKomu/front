package com.polmos.cc.rest;

import java.io.IOException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.ext.Provider;
import org.jboss.logging.Logger;

/**
 *
 * @author RobicToNieMaKomu
 */
@Provider
@PreMatching
public class RESTResponseFilter implements ContainerResponseFilter {

    private static final Logger logger = Logger.getLogger(RESTResponseFilter.class);

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        logger.info("Adding additional headers to the response");
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    }
}