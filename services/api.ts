export async function submitImageRequest(payload: any, apiKey: string) {
  let retries = 1;
  while (retries >= 0) {
    try {
      const response = await fetch('/api/image-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error ${response.status}: ${errText}`);
      }
      return await response.json();
    } catch (error) {
      if (retries === 0) throw error;
      retries--;
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}

export async function pollImageResult(requestId: string, apiKey: string) {
  const response = await fetch(`/api/image-result?request_id=${requestId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error ${response.status}: ${errText}`);
  }
  return await response.json();
}

export async function submitVideoRequest(payload: any, apiKey: string) {
  let retries = 1;
  while (retries >= 0) {
    try {
      const response = await fetch('/api/video-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error ${response.status}: ${errText}`);
      }
      return await response.json();
    } catch (error) {
      if (retries === 0) throw error;
      retries--;
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}

export async function pollVideoStatus(requestId: string, apiKey: string) {
  const response = await fetch(`/api/video-status?request_id=${requestId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error ${response.status}: ${errText}`);
  }
  return await response.json();
}

export async function getVideoResult(requestId: string, apiKey: string) {
  const response = await fetch(`/api/video-result?request_id=${requestId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error ${response.status}: ${errText}`);
  }
  return await response.json();
}
