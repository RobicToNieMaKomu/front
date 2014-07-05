package com.polmos.cc.rest;

import com.polmos.cc.constants.BundleName;
import com.polmos.cc.constants.Constants;
import com.polmos.cc.constants.OperationType;
import com.polmos.cc.service.ResourceManager;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import org.jboss.logging.Logger;

/**
 *
 * @author RobicToNieMaKomu
 */
public class RequestProcessorImpl implements RequestProcessor {

    private static final Logger logger = Logger.getLogger(RequestProcessorImpl.class);
    private static final String SEPARATOR = ",";
    
    @Inject
    private RESTClient restClient;
    
    @Override
    public JsonObject processRequest(int range, String type, String currencies) throws IOException {
        JsonObject result = null;
        List<String> listOfCurr = toList(currencies);
        validateInput(range, type, listOfCurr);
        try {
            JsonArray timeSeries = (JsonArray) restClient.sendGetRequest(timeSeriesURL(range, type, currencies));
            URI urlToResource = restClient.sendPostRequest(mstURL(type), packToJson(timeSeries, currencies));
            logger.info("urlToResource:" + urlToResource);
            result = (urlToResource != null) ? (JsonObject)restClient.sendGetRequest(urlToResource.toString()) : null; 
        } catch (Exception e) {
            logger.error("Exception occurred during processing mst", e);
        }
        return result;
    }

    private OperationType validateInput(int range, String type, List<String> currencies) throws IOException {
        if (currencies == null) {
            throw new IOException("Invalid input. At least 2 currencies expected");
        }
        List<String> allCurrencies = ResourceManager.getAllKeys(BundleName.CURRENCIES);
        for (String curr : currencies) {
            if (!allCurrencies.contains(curr)) {
                throw new IOException("Invalid input. Unsupported symbol of currency:" + curr);
            }
        }
        if (range < 0) {
            throw new IOException("Invalid input. Range should be equal to or greater than 0");
        }
        OperationType opType = OperationType.toOperationType(type);
        if (opType == null) {
            throw new IOException("Invalid input. Operation type should be bid or ask");
        }
        return opType;
    }
    
    private String timeSeriesURL(int range, String type, String currencies) {
        return Constants.URL_TO_CC_SERVICE + "?range=" + range + "&type=" + type + "&currencies=" + currencies; 
    }
    
    private String mstURL(String type) {
        return Constants.URL_TO_MST_SERVICE + "/" + type; 
    }
    
    private List<String> toList(String currencies) {
        List<String> output = null;
        if (currencies != null) {
            String[] splited = currencies.split(SEPARATOR);
            if (splited.length > 1) {
                output = new ArrayList<>(Arrays.asList(splited));
            }
        }
        return output;
    }
    
    private JsonObject packToJson(JsonArray jsonArray, String currencies) {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        builder.add("currencies", currencies);
        builder.add("data", jsonArray);
        return builder.build();
    }
}