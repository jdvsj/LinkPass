// 链接生成核心逻辑
function build_url() {
    // 获取用户输入的URL并去除首尾空格
    var url = document.querySelector('#url').value.trim();
    
    // 验证URL有效性（必须包含http/https）
    if (url === "" || !url.startsWith("http")) {
        document.getElementById("b_url").innerHTML = `输入的不是有效链接（需包含http/https）！`;
        return;
    }

    // 1. 加密处理：先URI编码再Base64加密（双重处理避免特殊字符问题）
    var encodedUrl = btoa(encodeURIComponent(url));
    
    // 2. 生成带加密参数的最终链接
    // 处理baseUrl，避免重复添加api/（兼容不同环境的路径）
    var baseUrl = window.location.href.endsWith('/') 
        ? window.location.href + 'api' 
        : window.location.href + '/api';
    var finalUrl = baseUrl + '?code=' + encodedUrl;
    
    // 3. 在页面显示生成的链接（可点击跳转）
    document.getElementById("b_url").innerHTML = `<a href="${finalUrl}" target='_blank'>${finalUrl}</a>`;
}

// 绑定生成按钮点击事件（如果原项目没有则添加，有则保留原逻辑）
document.addEventListener('DOMContentLoaded', function() {
    var generateBtn = document.querySelector('#generateBtn'); // 假设按钮ID是generateBtn
    if (generateBtn) {
        generateBtn.addEventListener('click', build_url);
    }
    // 支持回车键触发生成（可选增强）
    document.querySelector('#url').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            build_url();
        }
    });
});
