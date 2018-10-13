package com.github.shingyx.testplugin;

import android.content.Context;
import android.widget.Toast;

public class Toaster {
    public void show(Context context) {
        Toast.makeText(context, R.string.toast_text, Toast.LENGTH_LONG).show();
    }
}
