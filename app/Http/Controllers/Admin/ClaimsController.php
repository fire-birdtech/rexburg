<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ClaimStatus;
use App\Http\Controllers\Controller;
use App\Models\Claim;
use Inertia\Inertia;
use Lob\Lob;

class ClaimsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Claims/Index', [
            'claims' => Claim::orderBy('created_at', 'asc')->with(['claimable', 'user'])->get(),
        ]);
    }

    public function show(int $id)
    {
        return Inertia::render('Admin/Claims/Show', [
            'claim' => Claim::where('id', $id)->with(['claimable', 'user'])->firstOrFail(),
        ]);
    }

    public function approve(int $id)
    {
        $claim = Claim::where('id', $id)->firstOrFail();
        $this->sendPostcard($claim);
        $claim->status = ClaimStatus::APPROVED;
        $claim->save();

        return back()->with('success', 'Claim successfully approved!');
    }

    public function reject(int $id)
    {
        $claim = Claim::where('id', $id)->with(['claimable', 'user'])->firstOrFail();
        $claim->delete();

        return redirect()->route('admin.claims.index');
    }

    public function sendPostcard($recipient)
    {
        $lob = new Lob(env('LOB_API_KEY'));

        $from = $lob->addresses()->create([
            'name' => 'RexburgGuru',
            'address_line1' => '6022 Santo Domingo Rd',
            'address_city' => 'Colorado Springs',
            'address_state' => 'CO',
            'address_zip' => '80911',
        ]);

        $to = $lob->addresses()->create([
            'name' => $recipient->user->name,
            'address_line1' => $recipient->street_address,
            'address_city' => $recipient->city,
            'address_state' => 'ID',
            'address_zip' => $recipient->postal_code,
        ]);

        $postcard = $lob->postcards()->create([
            'to' => $to['id'],
            'from' => $from['id'],
            'front' => "
                <html>
                <head>
                    <style>
                        *,
                        *:before,
                        *:after {
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                
                        body {
                            width: 6.25in;
                            height: 4.25in;
                            margin: 0;
                            padding: 0;
                            background: #FFFFFF;
                        }
                
                        #safe-area {
                            position: absolute;
                            width: 5.875in;
                            height: 3.875in;
                            left: 0.1875in;
                            top: 0.1875in;
                            padding: 4rem;
                            background-color: #FFFFFF;
                        }
                    </style>
                </head>
                
                <body>
                    <div id='safe-area'>
                        <!-- All text should appear within the safe area. -->
                        <svg viewBox='0 0 2105 300' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                            <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                                <g fill='#0EA5E9' fill-rule='nonzero'>
                                    <g transform='translate(0.000000, 46.000000)'>
                                        <path d='M27.4,212 L27.4,126.5 L60.4,126.5 L110.2,212 L142.9,212 L90.4,124.4 C125.5,116.6 140.2,91.1 140.2,64.4 C140.2,30.2 116.8,2.9 67.6,2.9 L0.1,2.9 L0.1,212 L27.4,212 Z M67.6,104.6 L27.4,104.6 L27.4,25.4 L67.6,25.4 C98.8,25.4 112,40.7 112,64.4 C112,87.8 98.5,104.6 67.6,104.6 Z M298.409091,212 L298.409091,189.5 L213.209091,189.5 L213.209091,117.5 L289.409091,117.5 L289.409091,95 L213.209091,95 L213.209091,25.1 L298.409091,25.1 L298.409091,2.6 L185.909091,2.6 L185.909091,212 L298.409091,212 Z M364.218182,212 L411.918182,130.4 L462.018182,212 L492.918182,212 L428.718182,107.6 L493.218182,2.9 L462.618182,2.9 L414.618182,84.8 L364.218182,2.9 L333.618182,2.9 L397.818182,107.6 L333.918182,212 L364.218182,212 Z M610.927273,212 C654.127273,212 679.027273,187.4 679.027273,155.9 C679.027273,130.1 660.427273,108.2 637.627273,104.3 C657.727273,97.7 674.227273,82.4 674.227273,56 C674.227273,26.9 652.027273,2.9 607.927273,2.9 L532.927273,2.9 L532.927273,212 L610.927273,212 Z M606.127273,93.2 L560.227273,93.2 L560.227273,25.4 L605.527273,25.4 C632.227273,25.4 646.327273,38.6 646.327273,59.3 C646.327273,80.6 631.627273,93.2 606.127273,93.2 Z M608.527273,189.5 L560.227273,189.5 L560.227273,115.7 L607.627273,115.7 C634.327273,115.7 651.727273,130.1 651.727273,153.2 C651.727273,176 635.527273,189.5 608.527273,189.5 Z M798.236364,214.1 C841.436364,214.1 877.136364,189.2 877.136364,134.9 L877.136364,2.9 L849.836364,2.9 L849.836364,135.2 C849.836364,173.6 829.436364,190.1 798.536364,190.1 C767.636364,190.1 746.936364,173.6 746.936364,135.2 L746.936364,2.9 L719.636364,2.9 L719.636364,134.9 C719.636364,189.2 755.036364,214.1 798.236364,214.1 Z M953.445454,212 L953.445454,126.5 L986.445454,126.5 L1036.24545,212 L1068.94545,212 L1016.44545,124.4 C1051.54545,116.6 1066.24545,91.1 1066.24545,64.4 C1066.24545,30.2 1042.84545,2.9 993.645454,2.9 L926.145454,2.9 L926.145454,212 L953.445454,212 Z M993.645454,104.6 L953.445454,104.6 L953.445454,25.4 L993.645454,25.4 C1024.84545,25.4 1038.04545,40.7 1038.04545,64.4 C1038.04545,87.8 1024.54545,104.6 993.645454,104.6 Z M1206.75455,213.8 C1263.45455,213.8 1304.55455,172.1 1309.35455,120.2 L1309.35455,99.2 L1196.85455,99.2 L1196.85455,121.4 L1280.25455,121.4 C1276.05455,162.8 1247.85455,189.2 1206.75455,189.2 C1162.65455,189.2 1129.65455,157.4 1129.65455,107.3 C1129.65455,56.9 1162.65455,25.1 1206.75455,25.1 C1236.15455,25.1 1258.95455,39.2 1270.35455,63.5 L1303.05455,63.5 C1287.45455,23.3 1250.85455,0.5 1206.75455,0.5 C1147.95455,0.5 1101.75455,44.6 1101.75455,107.3 C1101.75455,170 1147.95455,213.8 1206.75455,213.8 Z'></path>
                                        <path d='M1414,213.8 C1470.7,213.8 1511.8,172.1 1516.6,120.2 L1516.6,99.2 L1404.1,99.2 L1404.1,121.4 L1487.5,121.4 C1483.3,162.8 1455.1,189.2 1414,189.2 C1369.9,189.2 1336.9,157.4 1336.9,107.3 C1336.9,56.9 1369.9,25.1 1414,25.1 C1443.4,25.1 1466.2,39.2 1477.6,63.5 L1510.3,63.5 C1494.7,23.3 1458.1,0.5 1414,0.5 C1355.2,0.5 1309,44.6 1309,107.3 C1309,170 1355.2,213.8 1414,213.8 Z M1634.00909,214.1 C1677.20909,214.1 1712.90909,189.2 1712.90909,134.9 L1712.90909,2.9 L1685.60909,2.9 L1685.60909,135.2 C1685.60909,173.6 1665.20909,190.1 1634.30909,190.1 C1603.40909,190.1 1582.70909,173.6 1582.70909,135.2 L1582.70909,2.9 L1555.40909,2.9 L1555.40909,134.9 C1555.40909,189.2 1590.80909,214.1 1634.00909,214.1 Z M1789.21818,212 L1789.21818,126.5 L1822.21818,126.5 L1872.01818,212 L1904.71818,212 L1852.21818,124.4 C1887.31818,116.6 1902.01818,91.1 1902.01818,64.4 C1902.01818,30.2 1878.61818,2.9 1829.41818,2.9 L1761.91818,2.9 L1761.91818,212 L1789.21818,212 Z M1829.41818,104.6 L1789.21818,104.6 L1789.21818,25.4 L1829.41818,25.4 C1860.61818,25.4 1873.81818,40.7 1873.81818,64.4 C1873.81818,87.8 1860.31818,104.6 1829.41818,104.6 Z M2025.72727,214.1 C2068.92727,214.1 2104.62727,189.2 2104.62727,134.9 L2104.62727,2.9 L2077.32727,2.9 L2077.32727,135.2 C2077.32727,173.6 2056.92727,190.1 2026.02727,190.1 C1995.12727,190.1 1974.42727,173.6 1974.42727,135.2 L1974.42727,2.9 L1947.12727,2.9 L1947.12727,134.9 C1947.12727,189.2 1982.52727,214.1 2025.72727,214.1 Z'></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </body>
                </html>
            ",
            'back' => '
                <div style="text-align: center">
                    <p style="padding-top: 3rem">Your verification code is {{code}}<p>
                </div>
            ',
            'merge_variables[code]' => $recipient->verification_code,
        ]);
    }
}
