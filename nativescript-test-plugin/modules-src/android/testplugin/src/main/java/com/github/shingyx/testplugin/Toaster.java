package com.github.shingyx.testplugin;

import android.content.Context;
import android.widget.Toast;

public class Toaster {
    private int numCalls = 0;

    public void show(Context context, int remaining) {
        String text = context.getString(R.string.toast_text, ++numCalls, remaining);
        Toast.makeText(context, text, Toast.LENGTH_LONG).show();
    }
}
