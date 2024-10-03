import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('smallcaps-converter.convertToSmallCaps', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            const convertedText = toSmallCaps(selectedText);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, convertedText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

const SMALL_CAPS_MAP: { [key: string]: string } = {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ',
    'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
    'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ',
    'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
    'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ',
    'z': 'ᴢ'
};

function toSmallCaps(text: string): string {
    let outputText = "";
    let i = 0;

    while (i < text.length) {
        if (i + 1 < text.length && text[i] === '&' && "abcdefklmnor".includes(text[i + 1])) {
            outputText += text[i] + text[i + 1];
            i += 2;
        } else {
            const char = text[i];
            if (char === char.toUpperCase()) {
                outputText += char;
            } else {
                outputText += SMALL_CAPS_MAP[char.toLowerCase()] || char;
            }
            i += 1;
        }
    }

    return outputText;
}
