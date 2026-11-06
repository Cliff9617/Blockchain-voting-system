/**
 * DeVote Kenya USSD Tester v2 - Full Flow with Back Navigation
 * Run from inside ussd-gateway/:  node test-ussd.js
 */

const http = require('http');
const querystring = require('querystring');

const TEST_PHONE   = '+254712345678';
const TEST_SESSION = 'session-' + Date.now();

function ussdRequest(text) {
    return new Promise((resolve, reject) => {
        const body = querystring.stringify({
            sessionId: TEST_SESSION,
            serviceCode: '*384*2026#',
            phoneNumber: TEST_PHONE,
            text: text
        });

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/ussd',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', c => { data += c; });
            res.on('end', () => resolve(data));
        });

        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

async function runTest(steps, title) {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`  TEST: ${title}`);
    console.log('═'.repeat(50));

    for (const step of steps) {
        const response = await ussdRequest(step.input);
        const isEnd    = response.startsWith('END');
        const icon     = isEnd ? '✅ END' : '📲 CON';
        console.log(`\n👤 ${step.label}`);
        console.log(`${icon}:\n${response.trim()}`);
        await new Promise(r => setTimeout(r, 300));
        if (isEnd) break;
    }
}

async function main() {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  DeVote Kenya USSD Gateway – Test Suite     ║');
    console.log('╚══════════════════════════════════════════════╝');

    // Test 1: Full vote flow in English (1 -> English)
    await runTest([
        { input: '',                              label: 'Dial *384*41484#' },
        { input: '1',                             label: 'Select Language: 1 (English)' },
        { input: '1*1',                           label: 'Press 1 → Vote Now' },
        { input: '1*1*12345678',                  label: 'Enter National ID: 12345678' },
        { input: '1*1*12345678*1234',             label: 'Enter PIN: 1234' },
        { input: '1*1*12345678*1234*1',           label: 'Select Position: 1 (President)' },
        { input: '1*1*12345678*1234*1*1',         label: 'Select Candidate: 1' },
        { input: '1*1*12345678*1234*1*1*1',       label: 'Confirm: 1 (Yes, Confirm Vote)' },
    ], 'Complete Vote Flow (English)');

    // Test 2: Full vote flow in Kiswahili (2 -> Kiswahili)
    await runTest([
        { input: '',                              label: 'Dial *384*41484#' },
        { input: '2',                             label: 'Select Language: 2 (Kiswahili)' },
        { input: '2*1',                           label: 'Bonyeza 1 → Piga Kura' },
        { input: '2*1*12345678',                  label: 'Weka National ID: 12345678' },
        { input: '2*1*12345678*1234',             label: 'Weka PIN: 1234' },
        { input: '2*1*12345678*1234*1',           label: 'Chagua Nafasi: 1 (Rais)' },
        { input: '2*1*12345678*1234*1*1',         label: 'Chagua Mgombea: 1' },
        { input: '2*1*12345678*1234*1*1*1',       label: 'Thibitisha: 1 (Ndio)' },
    ], 'Complete Vote Flow (Kiswahili)');

    // Test 3: Check registration (English)
    await runTest([
        { input: '',              label: 'Dial *384*41484#' },
        { input: '1',             label: 'Language: 1 (English)' },
        { input: '1*2',           label: 'Press 2 → Check Status' },
        { input: '1*2*12345678',  label: 'Enter National ID' },
    ], 'Check Voter Registration (English)');

    // Test 4: View candidates (Kiswahili)
    await runTest([
        { input: '',      label: 'Dial *384*41484#' },
        { input: '2',     label: 'Language: 2 (Kiswahili)' },
        { input: '2*3',   label: 'Bonyeza 3 → Tazama Wagombea' },
        { input: '2*3*1', label: 'Chagua 1 → Wagombea wa Rais' },
    ], 'View Candidates (Kiswahili)');

    // Test 5: Wrong PIN Security Test
    await runTest([
        { input: '',                       label: 'Dial *384*41484#' },
        { input: '1',                      label: 'Language: 1 (English)' },
        { input: '1*1',                    label: 'Press 1 → Vote Now' },
        { input: '1*1*12345678',           label: 'Enter National ID' },
        { input: '1*1*12345678*9999',      label: 'Enter WRONG PIN: 9999' },
    ], 'Wrong PIN Security Test');

    // Test 6: Smooth Back Navigation
    await runTest([
        { input: '',                                label: 'Dial *384*41484#' },
        { input: '2',                               label: 'Language: 2 (Kiswahili)' },
        { input: '2*1',                             label: 'Bonyeza 1 → Piga Kura' },
        { input: '2*1*12345678',                    label: 'Weka ID' },
        { input: '2*1*12345678*1234',               label: 'Weka PIN' },
        { input: '2*1*12345678*1234*1',             label: 'Chagua Rais' },
        { input: '2*1*12345678*1234*1*0',           label: 'Bonyeza 0 → RUDI kwenye orodha ya nafasi' },
    ], 'Back Navigation Test');

    // Test 7: Help menu (English) → now option 5
    await runTest([
        { input: '',    label: 'Dial *384*41484#' },
        { input: '1',   label: 'Language: 1 (English)' },
        { input: '1*5', label: 'Press 5 → IEBC Help' },
    ], 'IEBC Help Menu (English)');

    // Test 8: View Results – English (option 4, President / National)
    await runTest([
        { input: '',            label: 'Dial *384*41484#' },
        { input: '1',           label: 'Language: 1 (English)' },
        { input: '1*4',         label: 'Press 4 → View Results' },
        { input: '1*4*12345678', label: 'Enter National ID: 12345678' },
        { input: '1*4*12345678*1', label: 'Select 1 → President (National)' },
    ], 'View Results – President (English)');

    // Test 9: View Results – Kiswahili (option 4, Governor / County)
    await runTest([
        { input: '',            label: 'Dial *384*41484#' },
        { input: '2',           label: 'Language: 2 (Kiswahili)' },
        { input: '2*4',         label: 'Bonyeza 4 → Matokeo' },
        { input: '2*4*12345678', label: 'Weka National ID: 12345678' },
        { input: '2*4*12345678*2', label: 'Chagua 2 → Gavana (County)' },
    ], 'Matokeo – Gavana (Kiswahili)');

    console.log('\n✅ All tests complete. Check server console for SMS receipts.\n');
}

main().catch(console.error);
