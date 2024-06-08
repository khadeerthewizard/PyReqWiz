import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

function extractPythonModules(pythonText: string): string {
    const lines: string[] = pythonText.split('\n');
    const extractedLines: string[] = [];

    for (const line of lines) {
        if (line.includes("import") || line.includes("from")) {
            extractedLines.push(line.trim() + ';');
        }
    }

    return extractedLines.join('\n');
}

export function generateRequirements(){
    const activeEditor = vscode.window.activeTextEditor;
    if(!activeEditor){
        vscode.window.showErrorMessage("No active editor");
        return;
    }

    const fileUri = activeEditor.document.uri;
    const python_file = fs.readFileSync(fileUri.fsPath,'utf-8');
    const regex1 = /^((import|from)\s+.*;)/gm;

    const filtered = extractPythonModules(python_file);
    console.log(filtered);
    const regex = /\b(import|from)\s+([^,;]+)/g;
    const requirements: string[] = [];

    const modules = [];

    let match;

    while((match = regex.exec(filtered))!==null){
        modules.push(match[2]);
    }

    for( let a of modules ){
        let r: string[] = a.split(/[.\s]/);
        requirements.push(r[0]);
    }

    const requirementsContent = requirements.join('\n');
    const requirementsPath = path.join(path.dirname(fileUri.fsPath), 'requirements.txt');
    console.log(requirementsContent);
    fs.writeFileSync(requirementsPath,requirementsContent);
}