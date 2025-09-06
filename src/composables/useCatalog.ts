import { getAllProducts } from '@/api/endpoints/products'
import type { ProductItem } from '@/api/types/products'
import { ref } from 'vue'

export function useCatalog() {
  const isLoading = ref(false)
  const products = ref<ProductItem[]>([])
  const perPage = 20
  let page = 1
  let total = 0

  const fetch = async () => {
    if (isLoading.value) return
    isLoading.value = true
    const data = await getAllProducts({
      page: page,
      limit: perPage,
    })
    total = data.total
    isLoading.value = false
    return data
  }

  const load = async () => {
    const data = await fetch()
    products.value = data?.items || []
  }

  const loadMore = async () => {
    if (products.value.length >= total) return
    page += 1
    const data = await fetch()
    products.value = [...products.value, ...(data?.items || [])]
  }

  if (products.value.length === 0) {
    load()
  }

  return { products, isLoading, fetch, load, loadMore }
}
