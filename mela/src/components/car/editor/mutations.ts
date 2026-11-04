// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Elhamdulillahi Rabbil Alamin
// Ve salatu ve selamu ala Resulina Muhammedin 
// La ilahe illallah, Muhammedur Resulullah
// SuphanAllah velhamdulillah, Allahu Ekber
// Allah ümmetimizi korusun, birlik ve beraberliğimizi daim eylesin.



import { useToast } from "@/components/ui/use-toast";
import { CarPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./actions";

export function useSubmitPostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: Parameters<typeof submitPost>[0]) => {
      const result = await submitPost(input);
      if (result && "error" in result && result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: async (newPost) => {
      const queryFilter = {
        queryKey: ["content-section"],
        predicate(query) {
          return query.queryKey.includes("content-section");
        },
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<CarPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost as any, ...(firstPage.posts ?? [])],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
          return oldData;
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return queryFilter.predicate(query) && !query.state.data;
        },
      });

      toast({
        description: "gönderi yayınlandı",
      });
    },
    onError(error) {
      console.error("submitPost hatası:", error);
      toast({
        variant: "destructive",
        description:
          error instanceof Error && error.message
            ? `Hata: ${error.message}`
            : "Sorun çıktı tekrar deneyin devam ederse yekazad SC ile iletişime geçin.",
      });
    },
  });

  return mutation;
}