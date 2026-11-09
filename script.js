/* ==========================================================================
   RUDRA PRASAD RATH — COMMAND CENTER INTERACTION LOGIC
   Features: Zero-Scroll Tab Switching, Keyboard [1-6], Case Renderer,
             Real-time IDPS Telemetry, Interactive Terminal Console
   ========================================================================== */

(function () {
  'use strict';

  // 1. Tab Switching Engine (Zero-Scroll)
  var tabs = ['overview', 'ai-lab', 'cases', 'skills', 'experience', 'terminal'];
  var currentTab = 'overview';

  window.switchTab = function (tabId) {
    if (!tabs.includes(tabId)) return;
    currentTab = tabId;

    // Update Dock Buttons
    document.querySelectorAll('.dock-btn').forEach(function (btn) {
      var isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', String(isTarget));
    });

    // Update Panels
    document.querySelectorAll('.panel-view').forEach(function (panel) {
      var isTarget = panel.getAttribute('id') === 'panel-' + tabId;
      panel.classList.toggle('active', isTarget);
    });
  };

  // Add click listeners to dock buttons
  document.querySelectorAll('.dock-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = this.getAttribute('data-tab');
      window.switchTab(target);
    });
  });

  // 2. Keyboard Navigation ([1-6] and Arrow Keys)
  document.addEventListener('keydown', function (e) {
    // If typing in the terminal, ignore numeric shortcuts
    if (document.activeElement && document.activeElement.id === 'termInput') {
      return;
    }

    var key = e.key;
    if (['1', '2', '3', '4', '5', '6'].includes(key)) {
      var index = parseInt(key, 10) - 1;
      if (tabs[index]) {
        window.switchTab(tabs[index]);
      }
    }
  });

  // 3. Case Studies Data & Renderer
  var caseStudies = [
    {
      title: 'Web-Based Intrusion Detection & Prevention System (IDPS)',
      cat: 'DEFENSIVE APPLICATION SECURITY & ACTIVE MITIGATION',
      year: '2026',
      stack: ['Python', 'Flask', 'SQLite', 'Regular Expressions', 'REST Endpoints'],
      challenge: 'Web applications face continuous automated attacks (SQL injection, XSS, brute-force credential stuffing) where traditional firewalls either introduce latency or miss payload variations.',
      arch: 'Active Python/Flask middleware conducting deep payload inspection across incoming HTTP headers, form inputs, and URI parameters prior to database execution.',
      controls: 'Mitigates OWASP Top 10 A03:2021 (Injection) and A07:2021 (Auth Failures). Stateful IP rate limiting (60 req/min thresholds), dynamic temporary blacklisting, and live telemetry audit stream.',
      ai_component: 'Designed for heuristic integration: baseline HTTP request entropy scoring to flag polymorphic payloads before signature definitions exist.'
    },
    {
      title: 'OSINT Telephony Intelligence & Geolocation Engine',
      cat: 'THREAT INTELLIGENCE & RECONNAISSANCE AUTOMATION',
      year: '2026',
      stack: ['Python', 'REST APIs', 'JSON Normalization', 'Geocoding', 'Leaflet HTML'],
      challenge: 'SOC analysts and fraud response teams require rapid, automated enrichment of telephony indicators during phishing and vishing investigations without exposing analyst operational fingerprints.',
      arch: '10-tier modular Python intelligence engine normalizing global telephony datasets and querying third-party geocoding REST endpoints.',
      controls: 'Automates Tier-1 SOC triage times by extracting carrier routing identities, line validity, timezone parameters, and approximate geospatial coordinate mapping rendered into interactive HTML map views.',
      ai_component: 'Rule-based entity extraction and telephone format normalization for automated threat feeds.'
    },
    {
      title: 'Adversary Emulation & Penetration Testing Labs',
      cat: 'OFFENSIVE RECONNAISSANCE & LAB EXPLOITATION',
      year: 'Ongoing',
      stack: ['Kali Linux', 'Metasploit', 'Nmap', 'Wireshark', 'Burp Suite'],
      challenge: 'Building robust defensive tooling requires continuous validation of real-world offensive reconnaissance, privilege escalation, and lateral movement techniques.',
      arch: 'Controlled, isolated laboratory network environments on Hack The Box targeting deliberately vulnerable Linux and Windows services.',
      controls: 'Network port and script enumeration via Nmap, packet dissection in Wireshark, web application parameter tampering in Burp Suite, and privilege escalation path analysis.',
      ai_component: 'Analysis of automated scanning logs to identify signature detection blind spots.'
    }
  ];

  window.showCase = function (index) {
    var c = caseStudies[index];
    if (!c) return;

    // Update subnav buttons
    document.querySelectorAll('.case-nav-btn').forEach(function (btn, i) {
      btn.classList.toggle('active', i === index);
    });

    var container = document.getElementById('caseDetail');
    if (!container) return;

    var stackHtml = c.stack.map(function (s) {
      return '<span class="pill">' + s + '</span>';
    }).join(' ');

    container.innerHTML = 
      '<div style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">' +
        '<span class="card-badge">' + c.cat + ' // ' + c.year + '</span>' +
        '<h3 style="font-size: 1.35rem; color: var(--text-white); font-weight: 700; margin-top: 0.25rem;">' + c.title + '</h3>' +
      '</div>' +
      '<div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.875rem;">' +
        '<div><strong style="color: var(--cyan); font-family: var(--font-mono); font-size: 0.75rem; display: block; text-transform: uppercase;">The Security Problem:</strong><p style="color: var(--text-secondary); line-height: 1.5;">' + c.challenge + '</p></div>' +
        '<div><strong style="color: var(--cyan); font-family: var(--font-mono); font-size: 0.75rem; display: block; text-transform: uppercase;">Architecture & Implementation:</strong><p style="color: var(--text-secondary); line-height: 1.5;">' + c.arch + '</p></div>' +
        '<div><strong style="color: var(--cyan); font-family: var(--font-mono); font-size: 0.75rem; display: block; text-transform: uppercase;">Security Controls & Value:</strong><p style="color: var(--text-secondary); line-height: 1.5;">' + c.controls + '</p></div>' +
        '<div><strong style="color: var(--cyan); font-family: var(--font-mono); font-size: 0.75rem; display: block; text-transform: uppercase;">AI / Threat Modeling:</strong><p style="color: var(--text-secondary); line-height: 1.5;">' + c.ai_component + '</p></div>' +
        '<div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">' + stackHtml + '</div>' +
      '</div>';
  };

  // Initial case render
  window.showCase(0);

  // 4. Real-Time Telemetry Stream for Overview Console
  var streamEl = document.getElementById('overviewStream');
  var telemetryEvents = [
    { t: '15:40:02', m: 'AUTH_INGRESS · /api/v1/auth · TLS 1.3 verify', v: 'passed' },
    { t: '15:40:05', m: 'LLM_GUARD · Delimiter check passed on prompt', v: 'passed' },
    { t: '15:40:11', m: "SQLi_PAYLOAD · ' OR 1=1 -- · Intercepted", v: 'blocked' },
    { t: '15:40:19', m: 'BRUTE_FORCE · 16 auth attempts / 40s · 198.51.100.22', v: 'blocked' },
    { t: '15:40:20', m: 'IP_DROP · 198.51.100.22 added to iptables null-route', v: 'blocked' },
    { t: '15:40:32', m: 'XSS_FILTER · <script> tag sanitized from comment input', v: 'flagged' },
    { t: '15:40:48', m: 'OSINT_QUERY · Normalized telephony routing record', v: 'passed' },
    { t: '15:41:04', m: 'PROMPT_INJECT · Indirect RAG context isolation triggered', v: 'blocked' },
    { t: '15:41:18', m: 'RATE_LIMIT · Applied 60 req/min throttle · 203.0.113.14', v: 'flagged' }
  ];

  if (streamEl) {
    var eventIdx = 0;

    function pushLog(ev) {
      var row = document.createElement('div');
      row.className = 'log-entry';
      row.innerHTML = '<span class="log-t">' + ev.t + '</span>' +
                      '<span class="log-m">' + ev.m + '</span>' +
                      '<span class="log-v ' + ev.v + '">[' + ev.v.toUpperCase() + ']</span>';
      streamEl.appendChild(row);

      if (streamEl.children.length > 7) {
        streamEl.removeChild(streamEl.firstChild);
      }
    }

    // Seed first 4
    for (var i = 0; i < 4; i++) {
      pushLog(telemetryEvents[i]);
      eventIdx = 4;
    }

    setInterval(function () {
      if (eventIdx >= telemetryEvents.length) eventIdx = 0;
      pushLog(telemetryEvents[eventIdx]);
      eventIdx++;
    }, 2400);
  }

  // 5. Interactive Terminal Console
  var termInput = document.getElementById('termInput');
  var termOutput = document.getElementById('termOutput');

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';
        processCommand(cmd);
      }
    });

    function printLine(text, cssClass) {
      var p = document.createElement('p');
      p.className = 'term-line ' + (cssClass || '');
      p.innerHTML = text;
      termOutput.appendChild(p);
      termOutput.scrollTop = termOutput.scrollHeight;
    }

    function processCommand(cmd) {
      printLine('<span style="color: var(--green);">guest@rudra:~$</span> ' + cmd);

      switch (cmd) {
        case 'help':
          printLine('Available Commands:', 'text-cyan');
          printLine('  <strong>overview</strong>  - Switch to Overview HUD (Key 1)');
          printLine('  <strong>ailab</strong>     - Switch to AI Security Lab (Key 2)');
          printLine('  <strong>cases</strong>     - Switch to Case Studies (Key 3)');
          printLine('  <strong>skills</strong>    - Switch to Technical Competencies (Key 4)');
          printLine('  <strong>exp</strong>       - Switch to Experience & Credentials (Key 5)');
          printLine('  <strong>resume</strong>    - Download ATS Resume PDF');
          printLine('  <strong>email</strong>     - Display email address');
          printLine('  <strong>linkedin</strong>  - Open LinkedIn profile link');
          printLine('  <strong>github</strong>    - Open GitHub repositories link');
          printLine('  <strong>clear</strong>     - Clear terminal screen');
          break;

        case 'overview':
          window.switchTab('overview');
          printLine('Switched to Overview Panel.', 'text-green');
          break;

        case 'ailab':
          window.switchTab('ai-lab');
          printLine('Switched to AI Security Lab.', 'text-green');
          break;

        case 'cases':
          window.switchTab('cases');
          printLine('Switched to Case Studies Panel.', 'text-green');
          break;

        case 'skills':
          window.switchTab('skills');
          printLine('Switched to Competencies Panel.', 'text-green');
          break;

        case 'exp':
          window.switchTab('experience');
          printLine('Switched to Experience & Education Panel.', 'text-green');
          break;

        case 'resume':
          printLine('Opening ATS Resume: <a href="resume.html" target="_blank" class="text-cyan">resume.html (Printable / PDF)</a>', 'text-cyan');
          window.open('resume.html', '_blank');
          break;

        case 'email':
          printLine('Direct Email: <a href="mailto:rudrarath44@gmail.com" class="text-green">rudrarath44@gmail.com</a>');
          break;

        case 'linkedin':
          printLine('Opening LinkedIn: <a href="https://linkedin.com/in/rudra-prasad-rath-ba8b10209" target="_blank" class="text-cyan">rudra-prasad-rath-ba8b10209</a>');
          break;

        case 'github':
          printLine('Opening GitHub: <a href="https://github.com/KingLeo7" target="_blank" class="text-cyan">github.com/KingLeo7</a>');
          break;

        case 'clear':
          termOutput.innerHTML = '';
          printLine('Terminal screen cleared. Type "help" for available commands.', 'text-muted');
          break;

        default:
          if (cmd !== '') {
            printLine('Command not recognized: "' + cmd + '". Type <span class="text-cyan">help</span> for commands.', 'text-muted');
          }
          break;
      }
    }
  }

})();
