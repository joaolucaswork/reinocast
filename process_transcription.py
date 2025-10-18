#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para processar transcrição e gerar arquivo SRT com identificação de falantes
"""

import re
from datetime import timedelta

def parse_timestamp(timestamp_str):
    """Converte timestamp do formato 'M:SS' ou 'H:MM:SS' para segundos"""
    parts = timestamp_str.split(':')
    if len(parts) == 2:
        minutes, seconds = parts
        return int(minutes) * 60 + int(seconds)
    elif len(parts) == 3:
        hours, minutes, seconds = parts
        return int(hours) * 3600 + int(minutes) * 60 + int(seconds)
    return 0

def seconds_to_srt_time(seconds):
    """Converte segundos para formato SRT (HH:MM:SS,mmm)"""
    td = timedelta(seconds=seconds)
    hours = td.seconds // 3600
    minutes = (td.seconds % 3600) // 60
    secs = td.seconds % 60
    millis = td.microseconds // 1000
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def identify_speaker(text, timestamp_seconds, segment_number):
    """Identifica o falante baseado em padrões no texto, timestamp e número do segmento"""
    text_lower = text.lower()

    # Regra específica: do início até o segmento 71 é Gabriel Tintor
    if segment_number <= 71:
        return 'Gabriel Tintor'

    # Regra específica: a partir de 5:41 (341 segundos) até aproximadamente 7:00 é Caio Milfon
    if 341 <= timestamp_seconds <= 420:
        if any(phrase in text_lower for phrase in [
            'viralizam', 'vídeo engraçado', 'educação financeira',
            'experiência minha pessoal', 'coisas na internet'
        ]):
            return 'Caio Milfon'

    # Padrões para identificar Gabriel (fundador/CEO)
    if any(phrase in text_lower for phrase in [
        'gabriel tintor', 'fundador e ceo', 'reino capital',
        'eu já tenho uma experiência de 8 anos', 'formada em engenheiria',
        'trabalhava como engenheiro'
    ]):
        return 'Gabriel Tintor'

    # Padrões para identificar Wagner (advogado/diretor jurídico)
    if any(phrase in text_lower for phrase in [
        'wagner maranhão', 'diretor jurídico', 'advogado',
        '14 anos de de de for de formado', 'vavá', 'radialista'
    ]):
        return 'Wagner Maranhão'

    # Padrões para identificar Douglas (diretor financeiro/auditor)
    if any(phrase in text_lower for phrase in [
        'douglas', 'diretor financeiro', 'auditor',
        '15 anos de experiência no mercado', 'santander'
    ]):
        return 'Douglas'

    # Padrões para identificar Jairo (gestor de patrimônio)
    if any(phrase in text_lower for phrase in [
        'jairo', 'gestor de patrimônio', 'personal',
        'muitos anos já de mercado financeiro'
    ]):
        return 'Jairo'

    # Padrões para identificar Caio (diretor comercial)
    if any(phrase in text_lower for phrase in [
        'caio milfon', 'diretor comercial', 'latan',
        'agente de aeroporto', 'totem'
    ]):
        return 'Caio Milfon'

    return None

def process_transcription(input_file, output_file):
    """Processa o arquivo de transcrição e gera arquivo SRT"""
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    subtitles = []
    current_timestamp = None
    current_text = []
    current_speaker = 'Gabriel Tintor'  # Começa com Gabriel
    last_speaker = current_speaker
    segment_counter = 0

    # Padrão para detectar timestamps
    timestamp_pattern = re.compile(r'^(\d{1,2}:\d{2}(?::\d{2})?)$')

    for i, line in enumerate(lines):
        line = line.strip()

        # Pula linhas vazias e cabeçalhos
        if not line or line in ['Transcrição', 'Pesquisar transcrição']:
            continue

        # Verifica se é um timestamp
        match = timestamp_pattern.match(line)
        if match:
            # Se já temos texto acumulado, salva o subtitle anterior
            if current_timestamp is not None and current_text:
                segment_counter += 1
                text = ' '.join(current_text)

                # Tenta identificar o falante (passa o timestamp e número do segmento)
                speaker = identify_speaker(text, current_timestamp, segment_counter)
                if speaker:
                    current_speaker = speaker
                    last_speaker = speaker
                else:
                    # Mantém o último falante conhecido
                    current_speaker = last_speaker

                # Calcula próximo timestamp (5 segundos depois por padrão)
                next_timestamp = current_timestamp + 5

                subtitles.append({
                    'start': current_timestamp,
                    'end': next_timestamp,
                    'speaker': current_speaker,
                    'text': text
                })

                current_text = []

            # Atualiza timestamp atual
            current_timestamp = parse_timestamp(match.group(1))
        else:
            # Acumula texto
            if current_timestamp is not None:
                current_text.append(line)

    # Adiciona último subtitle se houver
    if current_timestamp is not None and current_text:
        segment_counter += 1
        text = ' '.join(current_text)
        speaker = identify_speaker(text, current_timestamp, segment_counter)
        if speaker:
            current_speaker = speaker

        subtitles.append({
            'start': current_timestamp,
            'end': current_timestamp + 5,
            'speaker': current_speaker,
            'text': text
        })
    
    # Ajusta os timestamps de fim para serem o início do próximo
    for i in range(len(subtitles) - 1):
        subtitles[i]['end'] = subtitles[i + 1]['start']
    
    # Gera arquivo SRT
    with open(output_file, 'w', encoding='utf-8') as f:
        for i, subtitle in enumerate(subtitles, 1):
            f.write(f"{i}\n")
            f.write(f"{seconds_to_srt_time(subtitle['start'])} --> {seconds_to_srt_time(subtitle['end'])}\n")
            f.write(f"[{subtitle['speaker']}]: {subtitle['text']}\n")
            f.write("\n")
    
    print(f"✅ Arquivo SRT gerado com sucesso: {output_file}")
    print(f"📊 Total de legendas: {len(subtitles)}")
    print(f"⏱️  Duração total: {seconds_to_srt_time(subtitles[-1]['end'])}")
    
    # Estatísticas de falantes
    speaker_counts = {}
    for subtitle in subtitles:
        speaker = subtitle['speaker']
        speaker_counts[speaker] = speaker_counts.get(speaker, 0) + 1
    
    print("\n👥 Distribuição de falas:")
    for speaker, count in sorted(speaker_counts.items(), key=lambda x: x[1], reverse=True):
        percentage = (count / len(subtitles)) * 100
        print(f"   {speaker}: {count} segmentos ({percentage:.1f}%)")

if __name__ == "__main__":
    input_file = "transcribe.md"
    output_file = "transcribe.srt"
    
    print("🎙️  Processando transcrição do podcast Reino Capital...")
    print(f"📄 Arquivo de entrada: {input_file}")
    print(f"💾 Arquivo de saída: {output_file}\n")
    
    process_transcription(input_file, output_file)
    
    print("\n✨ Processamento concluído!")

