package com.polmos.cc.rest;

import com.polmos.cc.constants.Constants;
import com.polmos.cc.constants.OperationType;
import java.io.IOException;
import java.net.URI;
import javax.inject.Inject;
import javax.json.JsonObject;
import org.jboss.logging.Logger;

/**
 *
 * @author RobicToNieMaKomu
 */
public class RequestProcessorImpl implements RequestProcessor {

    private static final Logger logger = Logger.getLogger(RequestProcessorImpl.class);

    @Inject
    private RESTClient restClient;
    
    @Override
    public JsonObject processRequest(int range, String type) throws IOException {
        JsonObject result = null;
        validateInput(range, type);
        try {
            JsonObject timeSeries = restClient.sendGetRequest(timeSeriesURL(range, type));
            URI urlToResource = restClient.sendPostRequest(mstURL(type), timeSeries);
            logger.info("urlToResource:" + urlToResource);
            result = (urlToResource != null) ? restClient.sendGetRequest(urlToResource.toString()) : null; 
        } catch (Exception e) {
            logger.error("Exception occurred during processing mst", e);
        }
        return result;
    }

    private OperationType validateInput(int range, String type) throws IOException {
        if (range < 0) {
            throw new IOException("Invalid input. Range should be equal to or greater than 0");
        }
        OperationType opType = OperationType.toOperationType(type);
        if (opType == null) {
            throw new IOException("Invalid input. Operation type should be bid or ask");
        }
        return opType;
    }
    
    private String timeSeriesURL(int range, String type) {
        return Constants.URL_TO_CC_SERVICE + "?range=" + range + "&type=" + type; 
    }
    
    private String mstURL(String type) {
        return Constants.URL_TO_MST_SERVICE + "/" + type; 
    }
}