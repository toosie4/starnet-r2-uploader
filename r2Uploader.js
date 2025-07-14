export async function uploadToR2(file) {
  const res = await fetch(`/api/upload-url?filename=${encodeURIComponent(file.name)}`);
  const { url } = await res.json();

  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });
}