import * as application from 'application';

interface IToaster {
    show(context: any, remaining: number): void;
}

declare const com: any;

const context = application.android.context;

let toaster: IToaster | undefined;

function getToaster(): IToaster {
    return toaster || (toaster = new com.github.shingyx.testplugin.Toaster());
}

export function toast(remaining: number) {
    getToaster().show(context, remaining);
}
