import React, { useState } from 'react';
import { Terminal, AlertCircle, CheckCircle2, Cpu, FileCode2 } from 'lucide-react';

interface CodeInspectorProps {
  code: string;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ code }) => {
  const [activeTab, setActiveTab] = useState<'pep8' | 'bytecode'>('pep8');

  // Realistic PEP 8 linter analysis
  const analyzePep8 = (source: string) => {
    const issues: { line: number; message: string; rule: string; type: 'warning' | 'info' }[] = [];
    const lines = source.split('\n');

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      // E501 line length > 79
      if (line.length > 79) {
        issues.push({
          line: lineNum,
          message: `Line too long (${line.length} > 79 characters)`,
          rule: 'PEP 8 (E501)',
          type: 'warning'
        });
      }
      // W191 tab indentation
      if (line.startsWith('\t')) {
        issues.push({
          line: lineNum,
          message: 'Indentation contains tabs instead of 4 spaces',
          rule: 'PEP 8 (W191)',
          type: 'warning'
        });
      }
      // E225 missing whitespace around operator
      if (/[a-zA-Z0-9][=+\-*\/][a-zA-Z0-9]/.test(line) && !line.includes('==') && !line.includes('!=')) {
        issues.push({
          line: lineNum,
          message: 'Missing whitespace around arithmetic operator',
          rule: 'PEP 8 (E225)',
          type: 'info'
        });
      }
      // Snake case check for function names
      const defMatch = line.match(/def\s+([a-zA-Z0-9_]+)/);
      if (defMatch && /[A-Z]/.test(defMatch[1])) {
        issues.push({
          line: lineNum,
          message: `Function name '${defMatch[1]}' should use lowercase_snake_case`,
          rule: 'PEP 8 (N802)',
          type: 'info'
        });
      }
    });

    return issues;
  };

  // Simulated CPython bytecode disassembly
  const generateBytecode = (source: string) => {
    const instructions: string[] = [];
    const lines = source.split('\n');

    instructions.push('  0 RESUME                   0');
    let offset = 2;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;

      if (line.startsWith('def ')) {
        const name = line.split(' ')[1].split('(')[0];
        instructions.push(`  ${offset.toString().padStart(2, ' ')} LOAD_BUILD_CLASS`);
        instructions.push(`  ${(offset + 2).toString().padStart(2, ' ')} LOAD_CONST               1 (<code object ${name}>)`);
        instructions.push(`  ${(offset + 4).toString().padStart(2, ' ')} MAKE_FUNCTION            0`);
        instructions.push(`  ${(offset + 6).toString().padStart(2, ' ')} STORE_NAME               0 (${name})`);
        offset += 8;
      } else if (line.includes('=')) {
        const parts = line.split('=');
        const varName = parts[0].trim();
        const val = parts[1].trim();
        instructions.push(`  ${offset.toString().padStart(2, ' ')} LOAD_CONST               2 (${val})`);
        instructions.push(`  ${(offset + 2).toString().padStart(2, ' ')} STORE_FAST               1 (${varName})`);
        offset += 4;
      } else if (line.startsWith('return ')) {
        const expr = line.replace('return ', '').trim();
        instructions.push(`  ${offset.toString().padStart(2, ' ')} LOAD_FAST                1 (${expr})`);
        instructions.push(`  ${(offset + 2).toString().padStart(2, ' ')} RETURN_VALUE`);
        offset += 4;
      } else if (line.startsWith('print(')) {
        instructions.push(`  ${offset.toString().padStart(2, ' ')} LOAD_GLOBAL              1 (NULL + print)`);
        instructions.push(`  ${(offset + 2).toString().padStart(2, ' ')} CALL                      1`);
        instructions.push(`  ${(offset + 4).toString().padStart(2, ' ')} POP_TOP`);
        offset += 6;
      }
    }

    if (instructions.length === 1) {
      instructions.push('  2 LOAD_CONST               0 (None)');
      instructions.push('  4 RETURN_VALUE');
    }

    return instructions.join('\n');
  };

  const issues = analyzePep8(code);
  const bytecodeOutput = generateBytecode(code);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0a0e17] overflow-hidden text-xs font-mono shadow-lg">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#060910] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pep8')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'pep8'
                ? 'bg-slate-800 text-amber-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>PEP 8 Linter ({issues.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bytecode')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'bytecode'
                ? 'bg-slate-800 text-sky-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>dis.dis() Bytecode</span>
          </button>
        </div>

        <span className="text-[10px] text-slate-500 font-mono">CPython 3.12 Engine</span>
      </div>

      {/* Content */}
      <div className="p-3 max-h-48 overflow-y-auto">
        {activeTab === 'pep8' ? (
          issues.length === 0 ? (
            <div className="flex items-center gap-2 text-emerald-400 p-2 font-sans text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Clean PEP 8 compliance. Zero style violations detected.</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              {issues.map((iss, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">Line {iss.line}:</span>{' '}
                    <span className="text-slate-300">{iss.message}</span>
                    <span className="ml-2 text-[10px] text-slate-500">[{iss.rule}]</span>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <pre className="text-[11px] leading-relaxed text-sky-300 bg-black/40 p-2.5 rounded-xl border border-slate-800/80 overflow-x-auto whitespace-pre">
            {bytecodeOutput}
          </pre>
        )}
      </div>
    </div>
  );
};
