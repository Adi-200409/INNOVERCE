import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import './BoardingPass.css';

const PASS_IMAGE = '/boarding-pass-template.png';
const PASS_WIDTH = 1280;
const PASS_HEIGHT = 720;

function fitText(ctx, text, x, y, maxWidth, fontSize, weight = '400', family = 'Arial, sans-serif') {
  const value = String(text || '—').trim() || '—';
  let size = fontSize;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(value).width > maxWidth && size > 12) {
    size -= 1;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  ctx.fillText(value, x, y, maxWidth);
}

function wrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text || '—').trim().split(/\s+/);
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);

  lines.slice(0, maxLines).forEach((lineText, index) => {
    const isLastVisibleLine = index === maxLines - 1 && lines.length > maxLines;
    fitText(ctx, isLastVisibleLine ? `${lineText}…` : lineText, x, y + index * lineHeight, maxWidth, 17);
  });
}

function drawField(ctx, label, value, x, y, width, maxLines = 3) {
  ctx.fillStyle = '#172033';
  ctx.font = '700 15px Arial, sans-serif';
  ctx.fillText(label, x, y);
  ctx.fillStyle = '#303b4d';
  ctx.font = '400 17px Arial, sans-serif';
  wrappedText(ctx, value, x, y + 22, width, 21, maxLines);
}

function drawPass(ctx, pass) {
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#172033';

  ctx.font = '500 21px "Courier New", monospace';
  fitText(ctx, pass.confirmationId, 1010, 68, 220, 21, '500', '"Courier New", monospace');

  ctx.font = '700 20px Arial, sans-serif';
  fitText(ctx, 'BOARDING PASS: INNOVERSE 3.0', 438, 145, 570, 20, '700');
  fitText(ctx, pass.teamName, 438, 226, 770, 57, '700');
  fitText(ctx, pass.leaderName, 438, 297, 770, 56, '400');

  drawField(ctx, 'LAUNCH SITE', [pass.institutionName, pass.collegeAddress].filter(Boolean).join(', '), 438, 360, 190, 4);
  drawField(ctx, 'ARRIVAL SITE', 'KLS Gogte Institute of Technology, Belagavi', 662, 360, 158, 3);
  drawField(ctx, 'ROCKET', pass.stream ? `${pass.stream} TRACK` : '', 846, 360, 180, 2);

  drawField(ctx, 'TEAM LEADER CONTACT', [pass.leaderEmail, pass.leaderContact].filter(Boolean).join('  •  '), 438, 646, 340, 2);
  drawField(ctx, 'SQUAD MEMBERS', [pass.member1Name, pass.member2Name].filter(Boolean).join('  •  '), 817, 646, 360, 2);
}

export default function BoardingPass({
  teamName,
  leaderName,
  leaderEmail,
  leaderContact,
  institutionName,
  collegeAddress,
  member1Name,
  member2Name,
  stream,
  confirmationId,
  submitted = false
}) {
  const canvasRef = useRef(null);
  const [templateImage, setTemplateImage] = useState(null);
  const [error, setError] = useState('');
  const pass = useMemo(() => ({
    teamName: teamName || 'Your team name',
    leaderName: leaderName || 'Team leader',
    leaderEmail,
    leaderContact,
    institutionName,
    collegeAddress,
    member1Name,
    member2Name,
    stream,
    confirmationId: confirmationId || 'INN-3.0-PREVIEW'
  }), [
    teamName,
    leaderName,
    leaderEmail,
    leaderContact,
    institutionName,
    collegeAddress,
    member1Name,
    member2Name,
    stream,
    confirmationId
  ]);

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.onload = () => {
      if (active) setTemplateImage(image);
    };
    image.onerror = () => {
      if (active) setError('The boarding pass artwork could not be loaded.');
    };
    image.src = PASS_IMAGE;

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Your browser could not prepare the boarding pass.');
      return;
    }

    ctx.clearRect(0, 0, PASS_WIDTH, PASS_HEIGHT);
    ctx.drawImage(templateImage, 0, 0, PASS_WIDTH, PASS_HEIGHT);
    drawPass(ctx, pass);
  }, [templateImage, pass]);

  const handleDownload = async () => {
    setError('');
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) {
      setError('The boarding pass is still loading. Please try again.');
      return;
    }

    try {
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) resolve(result);
          else reject(new Error('The boarding pass image could not be created.'));
        }, 'image/png');
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const safeTeamName = (pass.teamName || 'team')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'team';
      link.href = url;
      link.download = `${safeTeamName}-boarding-pass.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'Unable to download the boarding pass.');
    }
  };

  return (
    <section aria-label="Digital boarding pass" className="boarding-pass-print">
      <canvas
        ref={canvasRef}
        aria-label={`Boarding pass for ${pass.teamName}`}
        className="boarding-pass-canvas"
        width={PASS_WIDTH}
        height={PASS_HEIGHT}
      />
      <div className="boarding-pass-actions">
        <p>{submitted ? 'Your personalized boarding pass is ready to download.' : 'Your pass preview updates as you fill in your details.'}</p>
        <button type="button" onClick={handleDownload} disabled={!templateImage}>
          <Download className="h-4 w-4" />
          Download PNG
        </button>
      </div>
      {error && <p className="boarding-pass-error" role="alert">{error}</p>}
    </section>
  );
}
