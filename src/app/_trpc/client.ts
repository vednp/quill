import {createTRPCReact} from "@trpc/react-query"
import { AppRouter } from "@/src/trpc"

export const trpc = createTRPCReact<AppRouter>({})