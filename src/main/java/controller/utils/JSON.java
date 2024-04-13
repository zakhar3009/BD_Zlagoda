package controller.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JSON {

    private JSON(){}

    private static final Gson INStANCE = new GsonBuilder()
            .setDateFormat("yyyy-MM-dd")
            .create();

    public static Gson gson(){ return INStANCE; }
}
