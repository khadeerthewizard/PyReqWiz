
import * as vscode from 'vscode';
import { generateRequirements } from './requirementsGenerator';
import { stat } from 'fs';
import { runRequirements } from './runrequirements';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "pyreqwiz" is now active!');

	const disposable = vscode.commands.registerCommand('pyreqwiz.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from PyReqWiz!');
	});

	const PyReqWiz = vscode.commands.registerCommand('requirements-generator.generate',(uri)=>{
		vscode.window.showInformationMessage('Starting PyReqWiz - By Khadeer');
		generateRequirements();
		vscode.window.showInformationMessage('Successfully Generated requirements. Please check requirements.txt in the same project folder');
	});

	const PyReqWiz_Run = vscode.commands.registerCommand('requirements-run.execute',()=>{
		runRequirements();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(PyReqWiz);
	context.subscriptions.push()

	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,100);
	statusBarItem.text = 'PyReqWiz - Generate requirements';
	statusBarItem.command = 'y-requirements-generator.generate';
	statusBarItem.show();
}

export function deactivate() {}
