package com.polmos.cc.rest;

import java.net.URI;
import javax.json.JsonObject;
import javax.json.JsonStructure;

/**
 *
 * @author RobicToNieMaKomu
 */
public interface RESTClient {

    JsonStructure sendGetRequest(String url);
    
    URI sendPostRequest(String url, JsonObject body);
}
