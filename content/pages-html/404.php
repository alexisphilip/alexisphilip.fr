<style>
    @import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

    body {
        background: #1B1B1D;
        height: 100%;
        width: 100%;
        padding: 0 40px 40px 40px;
        margin: 0;

        /*font-family: 'Major Mono Display', Consolas, monospace, sans-serif;*/
        /*font-family: 'VT323', Consolas, monospace, sans-serif;*/
        /*font-family: 'Share Tech Mono', Consolas, monospace, sans-serif;*/
        font-family: Consolas, monospace, sans-serif;
        font-size: 1.3em;
        color: #C1C1C1;
    }
    * {
        box-sizing: border-box;
    }

    .base-line {
        width: 100%;
        display: flex;
    }

    .server-name {
        color: #19AC14;
    }

    .terminal-tilde {
        color: #1779E0;
    }

    .terminal-input {
        background: none;
        border: none;
        color: inherit;
        font-weight: inherit;
        font-size: inherit;
        font-family: inherit;
        width: 100%;
    }
</style>

<h1>404 NOT FOUND</h1>

<p>The page you are looking for does not exist.</p>
<p>Type "<strong>help</strong>" to see all commands.</p><br>

<div id="terminal">

    <div class="terminal-output"></div>

    <div class="base-line">
        <span class="server-name">404@alexisphilip.fr</span>:<span class="terminal-tilde">~</span>#&nbsp;
        <input type="text" class="terminal-input" value="">
    </div>
</div>
