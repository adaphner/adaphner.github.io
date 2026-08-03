/**
 * misc.js - Execution checklist logic + localStorage persistence
 *
 * Status rules (priority order):
 * 1. If ANY of the Yes/No questions is "No" : "Abort"
 * 2. If ANY of the Bullish/Range/Bearish questions is "Range" : "Wait"
 * 3. If ALL Yes/No are "Yes" AND both trends are "Bullish" or "Bearish" : "Execute"
 * 4. Fallback : "Wait"
 *
 * Persistence: every change is saved to localStorage and restored on page load.
 */

(function () {
    'use strict';

    // Group definitions
    const YES_NO_GROUPS = [
        'key-level',
        'market-structure',
        'risk-defined'
    ];

    const TREND_GROUPS = [
        'daily-trend',
        'premarket-status'
    ];

    const GROUPS = [...YES_NO_GROUPS, ...TREND_GROUPS];
    const STORAGE_KEY = 'miscChecklist';

    // Helpers – read / write radio values
    function getCheckedValue(name) {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
    }

    function setCheckedValue(name, value) {
        if (value == null) return;
        const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (el) {
            el.checked = true;
        }
    }

    function collectAnswers() {
        const answers = {};
        GROUPS.forEach(name => {
            answers[name] = getCheckedValue(name);
        });
        answers._updatedAt = new Date().toISOString();
        return answers;
    }

    function applyAnswers(answers) {
        if (!answers || typeof answers !== 'object') return;
        GROUPS.forEach(name => {
            if (answers[name] != null) {
                setCheckedValue(name, answers[name]);
            }
        });
    }

    // localStorage persistence
    function saveToLocalStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(collectAnswers()));
        } catch (err) {
            console.warn('[misc] localStorage save failed:', err);
        }
    }

    function loadFromLocalStorage() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            console.warn('[misc] localStorage load failed:', err);
            return null;
        }
    }

    // Summary status logic
    function evaluateStatus() {
        const yesNoValues = YES_NO_GROUPS.map(getCheckedValue);
        const trendValues = TREND_GROUPS.map(getCheckedValue);

        if (yesNoValues.some(v => v === null) || trendValues.some(v => v === null)) {
            return { status: 'Wait', className: 'status-wait' };
        }

        // 1. Any Yes/No is "No" - Abort
        if (yesNoValues.some(v => v === 'no')) {
            return { status: 'Abort', className: 'status-abort' };
        }

        // 2. Any trend is "Range" - Wait
        if (trendValues.some(v => v === 'range')) {
            return { status: 'Wait', className: 'status-wait' };
        }

        // 3. All Yes + both trends directional - Execute
        const allYes = yesNoValues.every(v => v === 'yes');
        const allDirectional = trendValues.every(v => v === 'bullish' || v === 'bearish');

        if (allYes && allDirectional) {
            return { status: 'Execute', className: 'status-execute' };
        }

        return { status: 'Wait', className: 'status-wait' };
    }

    function updateSummary() {
        const { status, className } = evaluateStatus();
        const statusEl = document.getElementById('summary-status');
        const container = document.querySelector('.summary-status-container');

        if (!statusEl) return;

        statusEl.textContent = status;

        const target = container || statusEl;
        target.classList.remove('status-execute', 'status-abort', 'status-wait');
        target.classList.add(className);
    }

    // Event handling
    function onAnswerChange() {
        updateSummary();
        saveToLocalStorage();
    }

    function bindListeners() {
        GROUPS.forEach(name => {
            document
                .querySelectorAll(`input[name="${name}"]`)
                .forEach(radio => {
                    radio.addEventListener('change', onAnswerChange);
                });
        });
    }

    // Initialisation
    function init() {
        const saved = loadFromLocalStorage();
        if (saved) {
            applyAnswers(saved);
        }

        bindListeners();
        updateSummary();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.MiscSummary = {
        evaluateStatus,
        updateSummary,
        collectAnswers,
        applyAnswers,
        saveToLocalStorage,
        loadFromLocalStorage,
        GROUPS,
        STORAGE_KEY
    };
})();