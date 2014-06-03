package com.polmos.cc.rest;

import java.net.URI;
import javax.json.JsonObject;

/**
 *
 * @author RobicToNieMaKomu
 */
public interface RESTClient {

    JsonObject sendGetRequest(String url);
    
    URI sendPostRequest(String url, JsonObject body);
}
