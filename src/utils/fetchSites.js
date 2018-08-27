
const fetchSites = async (searchString, start, take) => {
  chayns.showWaitCursor();
  let { Data } = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=${start}&Take=${take}`).then((res) => {
    if (!res.ok) throw new Error(`${res.status}\n${res.statusText}`);
    return res.json();
  });
  if (Data === null) Data = [];
  chayns.hideWaitCursor();
  return { sites: Data, reachedEnd: Data.length < take };
};

export default fetchSites;
