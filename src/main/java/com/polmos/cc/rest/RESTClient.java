package com.polmos.cc.rest;

import java.net.URI;
import javax.json.JsonArray;
import javax.json.JsonStructure;

/**
 *
 * @author RobicToNieMaKomu
 */
public interface RESTClient {

    JsonStructure sendGetRequest(String url);
    
    URI sendPostRequest(String url, JsonArray body);
}
