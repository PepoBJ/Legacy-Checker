
function renderCSS () {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");

    style.id = "extension";
    style.textContent = `
        .containner-checker {
        background-color:#fff!important;
        border-radius:5px 5px 0 0!important;
        padding:5px!important;
        box-shadow:rgba(6,24,44,0.4) 0 0 0 2px,rgba(6,24,44,0.65) 0 4px 6px -1px,rgba(255,255,255,0.08) 0 1px 0 inset!important;
        width:500px!important;
        height:200px!important;
        position:fixed!important;
        bottom:0!important;
        right:0!important;
        z-index:1000000000!important;
        margin-right:5px!important;
        overflow-y:scroll!important;
        scrollbar-width:thin!important;
        scrollbar-color:#90A4AE #CFD8DC!important;
        transition:all .5s ease-out!important;
        }
        
        .containner-checker::-webkit-scrollbar {
        width:10px!important;
        border-radius:50%!important;
        }
        
        .containner-checker::-webkit-scrollbar-track {
        background:#CFD8DC!important;
        }
        
        .containner-checker::-webkit-scrollbar-thumb {
        background-color:#1c6589!important;
        border-radius:10px!important;
        border:3px solid #CFD8DC!important;
        }
        
        .buttons-checker {
        position:fixed!important;
        right:0!important;
        margin-right:10px!important;
        margin-top:-32px!important;
        }
        
        .btn-close,.btn-minify {
        border:none!important;
        outline:none!important;
        cursor:pointer!important;
        font-weight:700!important;
        color:#fff!important;
        box-shadow:rgba(0,0,0,0.24) 0 3px 8px!important;
        padding-bottom:3px!important;
        box-sizing:border-box!important;
        width:26px!important;
        height:21px!important;
        }
        
        .btn-close {
        background-color:red!important;
        }
        
        .btn-minify {
        background-color:#1e6ddd!important;
        }
        
        .forms-checker {
        display:flex!important;
        justify-content:space-around!important;
        padding-top:5px!important;
        }
        
        .forms-checker .token-checker {
        width:75%!important;
        box-sizing:border-box!important;
        padding:3px!important;
        }
        
        .forms-checker .btn-checker, .forms-checker .btn-cleaner {
        background-color:#13aa52!important;
        border:1px solid #13aa52!important;
        border-radius:4px!important;
        box-shadow:rgba(0,0,0,.1) 0 2px 4px 0!important;
        box-sizing:border-box!important;
        color:#fff!important;
        cursor:pointer!important;
        font-size:12px!important;
        font-weight:400!important;
        outline:none!important;
        outline:0!important;
        text-align:center!important;
        transform:translateY(0)!important;
        transition:transform 150ms,box-shadow 150ms!important;
        user-select:none!important;
        -webkit-user-select:none!important;
        touch-action:manipulation!important;
        padding: 1px 6px !important;
        }

        .forms-checker .btn-cleaner {
            background-color:rgba(255, 140, 0, 1) !important;
            border-color:rgba(255, 110, 0, 1) !important;
        }
        
        .forms-checker .btn-checker:hover,.btn-close:hover,.btn-minify:hover,.btn-cleaner:hover {
        box-shadow:rgba(0,0,0,.15) 0 3px 9px 0!important;
        transform:translateY(-2px)!important;
        }
        
        #error-checkers {
        color:red!important;
        display:flex!important;
        font-size:12px!important;
        padding:5px 8px!important;
        }
        
        .banner-checker {
        display:inline-block!important;
        font-family: monospace !important;
        color:#fff!important;
        background-color: #3d77ff !important;
        border-radius: 5px !important;
        padding: 4px !important;
        vertical-align: bottom;
        border: 1px solid rgba(0,0,0,0.5);
        font-weight: bold;
        text-shadow: 0px 0px 1px rgba(81,67,21,0.8);
        letter-spacing: 1px;
        }
        .checker-autor {
            letter-spacing: 5px;
        }
        
        .checker-table {
        border-collapse:collapse!important;
        margin:25px 0!important;
        font-size:.8em!important;
        font-family:sans-serif!important;
        min-width:100%!important;
        box-shadow:0 0 20px rgba(0,0,0,0.15)!important;
        margin:0!important;
        }
        
        .checker-table thead tr {
        background-color:#3d77ff!important;
        color:#fff!important;
        text-align:center!important;
        }
        
        .checker-table th,.checker-table td {
        padding:4px!important;
        }
        
        .checker-table tbody tr {
        border-bottom:1px solid #ddd!important;
        }
        
        .checker-table tbody tr:nth-of-type(even) {
        background-color:#f3f3f3!important;
        }
        
        .checker-table tbody tr:last-of-type {
        border-bottom:2px solid #3d77ff!important;
        }
        
        .checker-table tbody tr.active-row {
        font-weight:700!important;
        color:#009879!important;
        }
        
        .btn-minify,.btn-close,.btn-checker,.forms-checker,.forms-checker .token-checker,.forms-checker .btn-checker,.forms-checker .btn-cleaner,.banner-checker,#error-checkers,.checker-table {
        position:relative!important;
        z-index:1000000000!important;
        }

        .checker-td-error{
            color: red !important;
            font-weight: bold !important;
        }
        .checker-td-warn{
            color: #ab8e1a !important;
            font-weight: bold !important;
        }
        .checker-td-success{
            color: green !important;
            font-weight: bold !important;
        }
        .checker-td-bold {
            font-weight: bold !important;
            color:#3d77ff!important;
        }
        .checker-td-text {
            word-wrap: break-word !important;
        }
        .checker-td-commend {
            width: 350px !important;
            max-width: 350px !important;
        }
        .checker-td-group, .checker-td-type {
            vertical-align: middle !important;
        }
        .checker-td-type { 
            text-align: center !important;
        }
        .btn-checker, .btn-cleaner {
            width: 50% !important;
        }
    `;

    head.appendChild(style);
}