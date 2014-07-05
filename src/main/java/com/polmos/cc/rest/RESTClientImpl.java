package com.polmos.cc.rest;

import java.io.StringReader;
import java.net.URI;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonStructure;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.core.Response;
import org.jboss.logging.Logger;

/**
 *
 * @author RobicToNieMaKomu
 */
public class RESTClientImpl implements RESTClient {

    private static final Logger logger = Logger.getLogger(RESTClientImpl.class);
    private static final String CONTENT_TYPE = "application/json";

    public RESTClientImpl() {
    }

    @Override
    public JsonStructure sendGetRequest(String url) {
        JsonStructure result = null;
        if (url != null && !url.isEmpty()) {
            logger.info("Sending get request to url:" + url);
            try {
                Client client = ClientBuilder.newClient();
                Invocation request = client.target(url).request(CONTENT_TYPE).accept(CONTENT_TYPE).buildGet();
                String response = request.invoke(String.class);
                logger.info("Response length:" + ((response != null) ? response.length() : null));
                result = Json.createReader(new StringReader(response)).read();
            } catch (Exception e) {
                logger.error("Couldnt get resource", e);
            }
        }
        return result;
    }

    @Override
    public URI sendPostRequest(String url, JsonObject body) {
        URI resourceUrl = null;
        if (url != null && body != null) {
            logger.debug("Sending post request to url:" + url);
            try {
                Client client = ClientBuilder.newClient();
                Response response = client.target(url).request(CONTENT_TYPE).post(Entity.entity(body, CONTENT_TYPE));
                if (response != null) {
                    logger.debug("Response code:" + response.getStatus());
                    resourceUrl = response.getLocation();
                }
            } catch (Exception e) {
                logger.error("Couldnt post resource", e);
            }
        }
        return resourceUrl;
    }
}
