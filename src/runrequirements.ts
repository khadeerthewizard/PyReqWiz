import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import * as path from 'path';
import { error } from 'console';
import { stderr, stdout } from 'process';


export function runRequirements(){
    const activeEditor =  vscode.window.activeTextEditor;
    if(!activeEditor){
        vscode.window.showErrorMessage("No acive Editor");
        return;
    }

    const fileUri = activeEditor.document.uri;
    const reqpath = path.join(path.dirname(fileUri.fsPath), 'requirements.txt');


    vscode.window.showInformationMessage('Starting PyReqWiz - Running requirements.txt');


    childProcess.exec(`pip install -r ${reqpath}`, (error,stdout,stderr)=>{
        if (error){
            vscode.window.showErrorMessage('Error running requirements.txt, Try generating requirements again');
            console.log(error);
        }
        else{
            vscode.window.showInformationMessage('Requirements installed successfully');
        }
    });
}