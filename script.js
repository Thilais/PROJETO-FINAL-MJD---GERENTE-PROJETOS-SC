async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Por favor, selecione um arquivo PDF.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    document.getElementById('status').innerText = 'Processando...';

    try {
        const response = await fetch('https://sua-api-no-render.com/generate-scope', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Erro ao processar o arquivo.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Escopo_Acordado.docx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.getElementById('status').innerText = 'Arquivo gerado com sucesso!';
    } catch (error) {
        document.getElementById('status').innerText = 'Erro ao gerar o arquivo.';
        console.error(error);
    }
}
