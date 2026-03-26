import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pilrgmtizqqshavgmmbn.supabase.co";
const supabaseKey = "sb_publishable_ky7K1HLc3QN0RW4Bmwp0oA_CvONB-4z";

export const supabase = createClient(supabaseUrl, supabaseKey);