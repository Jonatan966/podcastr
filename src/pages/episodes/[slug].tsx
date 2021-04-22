import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Episode } from '../../interfaces/Episode'
import { api } from '../../services/api'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from './episode.module.scss'

interface EpisodePageProps {
  episode: Required<Episode>;
}

export default function EpisodePage({ episode }: EpisodePageProps) {
  const router = useRouter()

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href='/'>
          <button type='button'>
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        
        <Image 
          src={episode.thumbnail} 
          width={700} 
          height={160}
          objectFit='cover'
        />

        <button type='button'>
          <img src="/play.svg" alt="Tocar episódio"/>
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div 
        className={styles.description} 
        dangerouslySetInnerHTML={{__html: episode.description}}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await api.get(`episodes/${context.params.slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}