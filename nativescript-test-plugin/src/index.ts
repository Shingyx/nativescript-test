import * as application from 'application';

interface IToaster {
    show(context: any): void;
}

declare const com: any;

const context = application.android.context;

export function toast() {
    const toaster: IToaster = new com.github.shingyx.testplugin.Toaster();
    toaster.show(context);
}
