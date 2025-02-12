export const isDateDiffIn3Days = (a, b) => {
    
    const mSInDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    if (Math.floor(Math.abs((utc2 - utc1))/ mSInDay) <= 3) return true;
    return false; 
  }