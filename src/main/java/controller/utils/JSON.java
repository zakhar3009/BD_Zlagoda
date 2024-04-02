package controller.utils;

import com.google.gson.Gson;

public class JSON {

    private JSON(){}

    private static final Gson INStANCE = new Gson();

    public static Gson gson(){ return INStANCE; }
}
