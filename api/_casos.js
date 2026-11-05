// Banco comum de perguntas, exame físico e exames: é igual em todos os casos,
// para não denunciar o que interessa. O 3.º elemento é a resposta por defeito.
const CASOS_BANK = {
  anamnese: [
    { sec: "História da doença actual", items: [
      ["hda_inicio", "Quando e como começaram as queixas?", "Não sei precisar bem."],
      ["hda_carater", "Pode descrever melhor o que sente?", "É difícil de explicar, sinto-me mal."],
      ["hda_evol", "Como tem evoluído desde o início?", "Está mais ou menos igual."],
      ["hda_agrav", "Há alguma coisa que piore ou alivie?", "Não reparei em nada."],
      ["hda_febre", "Teve febre ou arrepios?", "Não."],
      ["hda_tosse", "Tem tosse? Com expetoração?", "Não tenho tosse."],
      ["hda_hemopt", "Já tossiu sangue?", "Não."],
      ["hda_dispneia", "Sente falta de ar?", "Não."],
      ["hda_dortor", "Tem dor no peito?", "Não."],
      ["hda_palp", "Sentiu palpitações?", "Não."],
      ["hda_sincope", "Desmaiou ou esteve perto de desmaiar?", "Não."],
      ["hda_cefaleia", "Tem dores de cabeça?", "Não."],
      ["hda_neuro", "Fraqueza, formigueiros, confusão ou dificuldade em falar?", "Não."],
      ["hda_gi", "Náuseas, vómitos, diarreia ou dor de barriga?", "Não."],
      ["hda_mialg", "Dores musculares ou articulares?", "Não."],
      ["hda_pele", "Notou manchas, feridas ou cor amarelada na pele?", "Não."],
      ["hda_olhos", "Alterações nos olhos (vermelhidão, visão)?", "Não."],
      ["hda_urina", "Alterações na urina (cor, quantidade, dor)?", "Não."],
      ["hda_edema", "Inchaço ou dor nas pernas?", "Não."],
      ["hda_peso", "Perdeu peso sem querer?", "Não."],
      ["hda_sudor", "Tem suores à noite?", "Não."],
      ["hda_sono", "Como dorme? Ressona ou acorda cansado?", "Durmo bem."]
    ]},
    { sec: "Antecedentes pessoais", items: [
      ["ap_cronicas", "Tem alguma doença crónica?", "Não tenho doenças conhecidas."],
      ["ap_cirurg", "Cirurgias, internamentos ou imobilização recentes?", "Não."],
      ["ap_tvp", "Já teve tromboses ou embolias?", "Nunca."],
      ["ap_med", "Que medicação toma (incluindo pílula e produtos naturais)?", "Não tomo medicação habitual."],
      ["ap_alerg", "Tem alergias a medicamentos?", "Não tenho alergias conhecidas."],
      ["ap_vacinas", "Vacinas em dia? Fez alguma profilaxia?", "Acho que tenho as vacinas em dia."],
      ["ap_ist", "Já fez o teste do VIH? Teve infeções sexualmente transmissíveis?", "Não que saiba."],
      ["ap_tb", "Já teve tuberculose ou contacto com alguém com tuberculose?", "Não que saiba."]
    ]},
    { sec: "Hábitos e contexto", items: [
      ["h_tabaco", "Fuma?", "Não fumo."],
      ["h_alcool", "Bebe álcool? Quanto?", "Pouco, só socialmente."],
      ["h_drogas", "Consome drogas?", "Não."],
      ["h_prof", "Qual é a sua profissão? Exposições no trabalho?", "Trabalho num escritório, sem exposições especiais."],
      ["h_viagens", "Viajou recentemente? Para onde?", "Não viajei recentemente."],
      ["h_animais", "Tem contacto com animais?", "Não."],
      ["h_agua", "Banhos em rios ou lagos, ou desportos aquáticos?", "Não."],
      ["h_alim", "Comeu algo fora do habitual (leite ou queijo crus, água não tratada)?", "Nada de especial."],
      ["h_picadas", "Picadas de carraças ou mosquitos?", "Não me lembro."],
      ["h_sexual", "Vida sexual: parceiros e uso de preservativo?", "Relação estável."]
    ]},
    { sec: "Antecedentes familiares", items: [
      ["af_cv", "Doenças do coração ou morte súbita na família?", "Não que saiba."],
      ["af_trombose", "Tromboses na família?", "Não que saiba."],
      ["af_outros", "Outras doenças na família?", "Nada de relevante."]
    ]}
  ],
  exame: [
    { sec: "Geral", items: [
      ["e_geral", "Aspeto geral e estado de consciência", "Vígil, orientado, colaborante."],
      ["e_sv", "Sinais vitais (PA, FC, FR, temperatura)", "Sem alterações."],
      ["e_spo2", "Oximetria (SpO2)", "SpO2 98 % em ar ambiente."],
      ["e_ortost", "PA deitado e em pé", "Sem hipotensão ortostática."],
      ["e_pa4", "PA nos dois braços e pulsos femorais", "PA simétrica, pulsos femorais presentes."]
    ]},
    { sec: "Cabeça e pescoço", items: [
      ["e_olhos", "Olhos e conjuntivas", "Conjuntivas coradas, escleróticas anictéricas."],
      ["e_oro", "Cavidade oral e orofaringe", "Sem alterações."],
      ["e_fundo", "Fundoscopia", "Sem alterações."],
      ["e_jugular", "Pescoço e pressão venosa jugular", "Sem turgescência jugular."],
      ["e_ganglios", "Gânglios linfáticos", "Sem adenopatias palpáveis."]
    ]},
    { sec: "Tórax", items: [
      ["e_cardio", "Auscultação cardíaca", "S1 e S2 rítmicos, sem sopros."],
      ["e_pulm_insp", "Inspeção e palpação do tórax (expansibilidade, frémitos)", "Expansibilidade e frémitos simétricos."],
      ["e_pulm_perc", "Percussão torácica", "Ressonância simétrica."],
      ["e_pulm_ausc", "Auscultação pulmonar", "Murmúrio vesicular mantido, sem ruídos adventícios."]
    ]},
    { sec: "Abdómen, pele e membros", items: [
      ["e_abd", "Abdómen (palpação, fígado e baço)", "Mole, depressível, indolor, sem organomegalias."],
      ["e_pele", "Pele e mucosas", "Pele e mucosas coradas e hidratadas, sem lesões."],
      ["e_mi", "Membros inferiores (edema, assimetria, dor)", "Sem edemas nem assimetrias."],
      ["e_pulsos", "Pulsos periféricos e carotídeos", "Pulsos presentes, simétricos e amplos."]
    ]},
    { sec: "Neurológico", items: [
      ["e_neuro", "Exame neurológico sumário", "Sem défices focais."],
      ["e_meninge", "Sinais meníngeos", "Sem rigidez da nuca; Kernig e Brudzinski negativos."]
    ]}
  ],
  exames: [
    { sec: "Análises", items: [
      ["t_hemo", "Hemograma", "Sem alterações relevantes."],
      ["t_pcr", "Proteína C reativa", "Normal."],
      ["t_bioq", "Função renal, ionograma e glicemia", "Sem alterações relevantes."],
      ["t_hep", "Função hepática e bilirrubinas", "Sem alterações relevantes."],
      ["t_ck", "CK", "Normal."],
      ["t_ldh", "LDH", "Normal."],
      ["t_gaso", "Gasimetria arterial", "Sem alterações relevantes."],
      ["t_ddim", "D-dímeros", "Normais."],
      ["t_trop", "Troponina", "Negativa."],
      ["t_bnp", "BNP", "Normal."],
      ["t_urina", "Sumária de urina", "Sem alterações."],
      ["t_aldo", "Aldosterona e renina", "Sem alterações."],
      ["t_tsh", "TSH", "Normal."]
    ]},
    { sec: "Microbiologia e serologias", items: [
      ["t_hemoc", "Hemoculturas", "Negativas."],
      ["t_antig", "Antigenúria (pneumococo e Legionella)", "Negativa."],
      ["t_bk", "Expetoração: exame direto (BAAR), cultura e PCR para micobactérias", "Negativo."],
      ["t_lba", "Expetoração induzida / LBA para Pneumocystis", "Negativo."],
      ["t_igra", "IGRA / prova tuberculínica", "Negativo."],
      ["t_vih", "Teste VIH", "Negativo."],
      ["t_cd4", "Contagem de linfócitos CD4", "Normal."],
      ["t_serolep", "Serologia de Leptospira", "Negativa."],
      ["t_wright", "Rosa de Bengala / reação de Wright (Brucella)", "Negativa."],
      ["t_serorick", "Serologia de Rickettsia", "Negativa."],
      ["t_esfreg", "Gota espessa e esfregaço de sangue periférico", "Sem parasitas."],
      ["t_pl", "Punção lombar", "LCR normal."]
    ]},
    { sec: "Imagem e outros", items: [
      ["t_ecg", "ECG", "Ritmo sinusal, sem alterações."],
      ["t_rx", "Radiografia do tórax", "Sem alterações."],
      ["t_angiotc", "Angio-TC pulmonar", "Sem alterações."],
      ["t_eco", "Ecocardiograma", "Sem alterações."],
      ["t_doppler", "Ecodoppler venoso dos membros inferiores", "Sem trombose."],
      ["t_ecoabd", "Ecografia abdominal", "Sem alterações."],
      ["t_ecorenal", "Ecodoppler das artérias renais", "Sem estenoses."],
      ["t_tccr", "TC crânio-encefálica", "Sem alterações."],
      ["t_tcsr", "TC das suprarrenais", "Sem alterações."],
      ["t_holter", "Holter 24 h", "Sem arritmias."],
      ["t_tilt", "Teste de tilt", "Negativo."],
      ["t_espiro", "Espirometria", "Normal."]
    ]}
  ]
};

// Casos. chave = o que devia ser perguntado/examinado: [peso 3 essencial | 2 importante | 1 acessório, porquê].
// indicados = exames certos; errados = exames que não deviam ser pedidos (com porquê); hip = [opção, 2 principal | 1 plausível | 0 improvável].
const CASOS = [
{
  id: "tep", tema: "tep", area: "Pneumologia", titulo: "Tromboembolismo pulmonar",
  doente: "Mulher, 32 anos", local: "Serviço de Urgência",
  queixa: "Falta de ar que começou de repente há 6 horas.",
  a: {
    hda_inicio: "Começou de repente hoje de manhã, quando me levantei da cama. Nunca tinha tido nada assim.",
    hda_carater: "Falta de ar que não passa e uma pontada do lado direito do peito.",
    hda_evol: "Está igual desde que começou, talvez um pouco pior.",
    hda_agrav: "A dor piora quando respiro fundo ou tusso.",
    hda_dispneia: "Sim, mesmo parada sinto falta de ar.",
    hda_dortor: "Sim, uma pontada à direita que piora a inspirar.",
    hda_tosse: "Uma tosse seca, pouca.",
    hda_hemopt: "Hoje cuspi um bocadinho de sangue misturado com saliva.",
    hda_palp: "Sinto o coração acelerado.",
    hda_febre: "Não tive febre.",
    hda_edema: "Agora que pergunta: a perna esquerda está mais inchada e dói-me na barriga da perna há uns 3 dias.",
    ap_cirurg: "Não fui operada. Mas passei 12 horas sentada no avião de volta do Brasil, há 4 dias.",
    ap_med: "Tomo a pílula há 10 anos. Mais nada.",
    h_tabaco: "Fumo cerca de um maço por dia há 12 anos.",
    h_viagens: "Voltei há 4 dias do Brasil, 12 horas de avião quase sem me levantar.",
    af_trombose: "A minha mãe teve uma trombose numa perna depois de um parto."
  },
  ex: {
    e_geral: "Ansiosa, polipneica, orientada.",
    e_sv: "PA 118/76 mmHg, FC 112 bpm, FR 26 cpm, T 37,4 ºC.",
    e_spo2: "SpO2 91 % em ar ambiente.",
    e_cardio: "Taquicardia rítmica, sem sopros; P2 ligeiramente reforçado.",
    e_mi: "Perna esquerda com +3 cm de perímetro, edema, calor e dor à palpação do gémeo.",
    e_pulm_ausc: "Murmúrio vesicular mantido, sem ruídos adventícios."
  },
  t: {
    t_ecg: "Taquicardia sinusal a 112 bpm; padrão S1Q3T3.",
    t_gaso: "pH 7,48; PaO2 62 mmHg; PaCO2 31 mmHg: hipoxemia com hipocapnia (alcalose respiratória).",
    t_rx: "Sem consolidações nem pneumotórax; ligeira elevação da hemicúpula direita.",
    t_angiotc: "Defeitos de preenchimento nas artérias lobares inferior e média direitas. Relação VD/VE < 1.",
    t_doppler: "Trombose venosa profunda poplítea e femoral superficial esquerda.",
    t_trop: "Troponina negativa.",
    t_bnp: "BNP normal.",
    t_hemo: "Hb 13,8 g/dL, leucócitos 9 800/µL, plaquetas 260 000/µL.",
    t_bioq: "Creatinina 0,7 mg/dL (função renal normal para contraste), ionograma normal.",
    t_eco: "Sem dilatação nem disfunção do ventrículo direito.",
    t_ddim: "D-dímeros 3 200 ng/mL (elevados)."
  },
  chave: {
    hda_inicio: [3, "O início súbito é a pista principal de TEP."],
    hda_dortor: [2, "Dor pleurítica sugere enfarte pulmonar."],
    hda_hemopt: [2, "Hemoptise entra nos critérios de Wells."],
    hda_edema: [3, "Sinais de TVP são o critério com mais peso no score de Wells."],
    ap_med: [3, "Contracetivo com estrogénio é um estado de hipercoagulabilidade (Tríade de Virchow)."],
    h_viagens: [3, "Viagem longa com imobilização é estase venosa (Tríade de Virchow)."],
    ap_cirurg: [2, "Cirurgia ou imobilização recente é fator de risco e critério de Wells."],
    ap_tvp: [2, "TVP/TEP prévio entra no score de Wells."],
    af_trombose: [1, "História familiar sugere trombofilia."],
    h_tabaco: [1, "O tabaco soma ao risco trombótico com a pílula."],
    hda_febre: [1, "Ajuda a afastar pneumonia."],
    hda_sincope: [1, "Síncope num TEP indica gravidade."],
    e_sv: [3, "FC > 100 entra no Wells; PA define se é TEP de alto risco."],
    e_spo2: [3, "Hipoxemia confirma compromisso das trocas."],
    e_mi: [3, "Sinais de TVP: o critério mais pesado do Wells."],
    e_pulm_ausc: [2, "Auscultação normal com hipoxemia é típica de TEP e afasta pneumonia ou derrame."],
    e_cardio: [1, "Procurar sinais de sobrecarga do VD."]
  },
  indicados: {
    t_angiotc: [3, "Gold-standard para confirmar TEP."],
    t_ecg: [2, "Exclui SCA; taquicardia sinusal é o achado mais comum."],
    t_gaso: [2, "Hipoxemia com hipocapnia."],
    t_rx: [1, "Exclui pneumotórax e pneumonia."],
    t_trop: [2, "Estratificação de risco (lesão do VD)."],
    t_bnp: [1, "Estratificação de risco (disfunção do VD)."],
    t_bioq: [2, "Função renal antes do contraste."],
    t_doppler: [1, "Confirma a TVP de origem."],
    t_hemo: [1, "Basal antes de anticoagular."]
  },
  errados: {
    t_ddim: "Com Wells ≥ 4 (sinais de TVP 3 + TEP mais provável 3 + FC > 100 1,5 + hemoptise 1) o TEP é provável: vai-se direto ao Angio-TC. Os D-dímeros só servem para excluir quando a probabilidade é baixa."
  },
  hip: [["Tromboembolismo pulmonar", 2], ["Pneumonia adquirida na comunidade", 1], ["Pneumotórax", 1], ["Síndrome coronária aguda", 1], ["Crise de ansiedade", 0], ["Exacerbação de asma", 0]],
  dx: [
    ["TEP sem instabilidade hemodinâmica, provocado (pílula + viagem), com TVP proximal", true, "Estável (PA normal), troponina/BNP normais e VD sem disfunção: TEP de baixo risco."],
    ["TEP de alto risco (maciço)", false, "Não há choque nem hipotensão: não é alto risco."],
    ["Pneumonia adquirida na comunidade", false, "Sem febre, sem consolidação no Rx."],
    ["Pneumotórax espontâneo", false, "O Rx não mostra pneumotórax."],
    ["Enfarte agudo do miocárdio", false, "Troponina negativa e ECG sem supra de ST."]
  ],
  tx: [
    ["Anticoagulação (HBPM → anticoagulante oral) durante pelo menos 3 meses e suspender a pílula", true, "TEP de baixo risco: anticoagular e retirar o fator de risco."],
    ["Fibrinólise com alteplase", false, "Fibrinólise reserva-se para TEP de alto risco (choque)."],
    ["Antibioterapia empírica", false, "Não é uma infeção."],
    ["Drenagem torácica", false, "Não há pneumotórax nem derrame."]
  ],
  aprender: ["Calcular Wells antes de pedir exames: define se vais aos D-dímeros ou direto ao Angio-TC.", "Perguntar sempre pela Tríade de Virchow: estase, hipercoagulabilidade, lesão endotelial.", "Ecocardiograma, troponina e BNP estratificam o risco, não diagnosticam."]
},
{
  id: "pac", tema: "pneumonia", area: "Pneumologia", titulo: "Pneumonia adquirida na comunidade grave",
  doente: "Homem, 78 anos (acompanhado pela filha)", local: "Serviço de Urgência",
  queixa: "Febre e tosse há 3 dias; hoje está \"mais confuso\".",
  a: {
    hda_inicio: "Há 3 dias começou com febre e tosse.",
    hda_carater: "Está muito cansado e não come.",
    hda_evol: "Foi piorando; hoje está confuso.",
    hda_tosse: "Tosse com expetoração amarelo-esverdeada, às vezes cor de ferrugem.",
    hda_febre: "Febre até 39 ºC com arrepios.",
    hda_dispneia: "Cansa-se a ir à casa de banho.",
    hda_dortor: "Dói-lhe do lado direito quando tosse.",
    hda_neuro: "A filha diz que hoje troca os dias e de manhã não a reconheceu.",
    hda_gi: "Tem comido muito pouco, sem vómitos.",
    ap_cronicas: "Hipertensão, diabetes tipo 2 e DPOC ligeira.",
    ap_med: "Metformina, ramipril e um inalador de tiotrópio.",
    ap_alerg: "Não tem alergias conhecidas.",
    ap_vacinas: "Não fez a vacina da gripe este ano nem a pneumocócica.",
    ap_cirurg: "Não esteve internado nos últimos meses nem fez antibióticos.",
    h_tabaco: "Ex-fumador, 40 UMA; deixou há 10 anos.",
    h_prof: "Reformado, era carpinteiro."
  },
  ex: {
    e_geral: "Sonolento, desorientado no tempo.",
    e_sv: "PA 88/54 mmHg, FC 108 bpm, FR 32 cpm, T 38,9 ºC.",
    e_spo2: "SpO2 88 % em ar ambiente.",
    e_pele: "Mucosas secas.",
    e_pulm_insp: "Expansibilidade diminuída na base direita; frémitos aumentados na base direita.",
    e_pulm_perc: "Macicez na base direita.",
    e_pulm_ausc: "Crepitações e sopro tubário na base direita.",
    e_cardio: "Taquicárdico, sem sopros."
  },
  t: {
    t_rx: "Consolidação no lobo inferior direito com broncograma aéreo; sem derrame.",
    t_hemo: "Leucócitos 18 400/µL com neutrofilia; Hb 13 g/dL; plaquetas 210 000/µL.",
    t_pcr: "PCR 24 mg/dL.",
    t_bioq: "Ureia 68 mg/dL, creatinina 1,6 mg/dL, glicemia 210 mg/dL, Na+ 134.",
    t_gaso: "PaO2 54 mmHg, PaCO2 38 mmHg, lactato 2,8 mmol/L.",
    t_hemoc: "Colhidas antes do antibiótico; resultado em 48 h.",
    t_antig: "Antigénio urinário de pneumococo positivo; Legionella negativo.",
    t_ecg: "Taquicardia sinusal."
  },
  chave: {
    hda_tosse: [3, "Tosse produtiva é o sintoma central."],
    hda_febre: [3, "Febre com arrepios aponta para infeção bacteriana."],
    hda_neuro: [3, "Confusão é o C do CURB-65."],
    hda_dispneia: [2, "Avalia a gravidade."],
    hda_dortor: [2, "Dor pleurítica sugere atingimento pleural."],
    ap_cronicas: [2, "Comorbilidades mudam o antibiótico e o prognóstico."],
    ap_alerg: [2, "Obrigatório antes de prescrever antibióticos."],
    ap_cirurg: [2, "Internamento ou antibiótico recentes sugerem agentes resistentes."],
    ap_vacinas: [1, "Prevenção (gripe e pneumococo)."],
    h_tabaco: [1, "Fator de risco e enquadramento da DPOC."],
    e_sv: [3, "FR ≥ 30 e PAS < 90 entram no CURB-65."],
    e_spo2: [3, "Hipoxemia obriga a internar."],
    e_pulm_ausc: [3, "Crepitações e sopro tubário localizam a consolidação."],
    e_pulm_perc: [2, "Macicez confirma consolidação (ou derrame)."],
    e_pulm_insp: [2, "Frémitos aumentados distinguem consolidação de derrame."],
    e_geral: [2, "Avaliar o estado de consciência."]
  },
  indicados: {
    t_rx: [3, "Confirma a pneumonia e distingue-a de bronquite."],
    t_bioq: [3, "A ureia é o U do CURB-65."],
    t_hemo: [2, "Leucocitose confirma o quadro infeccioso."],
    t_gaso: [2, "Quantifica a insuficiência respiratória e o lactato."],
    t_hemoc: [2, "Pneumonia grave: colher antes do antibiótico."],
    t_antig: [2, "Identifica pneumococo ou Legionella rapidamente."],
    t_pcr: [1, "Marcador inflamatório de seguimento."]
  },
  errados: {},
  hip: [["Pneumonia adquirida na comunidade", 2], ["Exacerbação de DPOC", 1], ["Tromboembolismo pulmonar", 1], ["Insuficiência cardíaca descompensada", 1], ["Pneumonia de aspiração", 1], ["Crise de ansiedade", 0]],
  dx: [
    ["PAC grave (CURB-65 = 5) por S. pneumoniae", true, "Confusão + ureia > 20 + FR ≥ 30 + PAS < 90 + idade ≥ 65 = 5 pontos."],
    ["Exacerbação de DPOC", false, "Há consolidação lobar no Rx: é pneumonia."],
    ["Pneumonia nosocomial", false, "Não esteve internado recentemente."],
    ["Tuberculose pulmonar", false, "Quadro agudo de 3 dias com consolidação lobar inferior."],
    ["Edema agudo do pulmão", false, "Consolidação unilateral com febre e leucocitose."]
  ],
  tx: [
    ["Internar (ponderar UCI): ceftriaxona EV + macrólido, fluidos e oxigénio", true, "CURB-65 ≥ 2 obriga a internar; cobrir pneumococo, H. influenzae e atípicos."],
    ["Amoxicilina oral em ambulatório", false, "CURB-65 de 5 e hipoxemia: não pode ir para casa."],
    ["Levofloxacina oral e reavaliar em 48 h no domicílio", false, "Doente instável, precisa de internamento."],
    ["Vancomicina + meropenem por risco de multirresistência", false, "Sem fatores de risco para MRSA ou Pseudomonas."]
  ],
  aprender: ["Calcular o CURB-65 em todas as pneumonias: ≥ 2 é internar.", "Perguntar alergias antes de qualquer antibiótico.", "Frémitos aumentados = consolidação; diminuídos = derrame."]
},
{
  id: "lepto", tema: "zoonoses", area: "Infecciologia", titulo: "Leptospirose grave (doença de Weil)",
  doente: "Homem, 26 anos", local: "Serviço de Urgência",
  queixa: "Febre alta e dores musculares fortes há 5 dias; hoje está amarelo.",
  a: {
    hda_inicio: "Há 5 dias, de repente, com febre e dores no corpo todo.",
    hda_carater: "Dores musculares fortíssimas e muito cansaço.",
    hda_evol: "Piorou; hoje acordei amarelo.",
    hda_febre: "Febre de 39 a 40 ºC com arrepios.",
    hda_mialg: "Dores musculares fortíssimas, sobretudo nas barrigas das pernas; mal consigo andar.",
    hda_cefaleia: "Dor de cabeça forte, sobretudo atrás dos olhos.",
    hda_olhos: "Tenho os olhos muito vermelhos, mas não deitam remela.",
    hda_urina: "A urina está escura e tenho urinado muito pouco desde ontem.",
    hda_gi: "Náuseas e um vómito.",
    hda_pele: "Estou amarelo desde hoje.",
    hda_tosse: "Uma tosse ligeira.",
    h_agua: "Há 10 dias fiz canoagem no rio com amigos e caí várias vezes à água.",
    h_prof: "Sou estudante; nas férias trabalho numa quinta.",
    h_animais: "Na quinta há muitos ratos no armazém.",
    h_viagens: "Não saí do país.",
    h_alcool: "Bebo ao fim de semana, não muito.",
    h_sexual: "Namorada estável, sem outros parceiros.",
    ap_med: "Não tomo nada. Tomei ibuprofeno para as dores."
  },
  ex: {
    e_geral: "Prostrado, orientado.",
    e_sv: "PA 102/64 mmHg, FC 104 bpm, FR 20 cpm, T 39,2 ºC.",
    e_olhos: "Sufusão conjuntival bilateral sem exsudado; escleróticas ictéricas.",
    e_pele: "Icterícia; algumas petéquias nos membros inferiores.",
    e_abd: "Hepatomegalia dolorosa ligeira, sem esplenomegalia.",
    e_mi: "Dor intensa à palpação dos gémeos, sem edema."
  },
  t: {
    t_hemo: "Leucócitos 14 200/µL com neutrofilia; plaquetas 62 000/µL; Hb 12,9 g/dL.",
    t_bioq: "Creatinina 3,1 mg/dL, ureia 140 mg/dL, K+ 3,4 mmol/L.",
    t_hep: "Bilirrubina total 9 mg/dL (predomínio conjugada); AST/ALT 2–3× o normal.",
    t_ck: "CK 4 800 U/L.",
    t_urina: "Proteinúria, hematúria e leucocitúria.",
    t_serolep: "IgM anti-Leptospira positiva.",
    t_hemoc: "Colhidas; Leptospira detetável no sangue apenas na 1.ª semana.",
    t_pcr: "PCR 18 mg/dL.",
    t_ecoabd: "Fígado ligeiramente aumentado, vias biliares não dilatadas."
  },
  chave: {
    h_agua: [3, "Exposição a água doce contaminada é a chave da leptospirose."],
    h_animais: [2, "Ratos são o reservatório (urina)."],
    h_viagens: [2, "Sem viagem a zona endémica, afasta malária e dengue."],
    hda_mialg: [3, "Mialgias intensas dos gémeos são típicas."],
    hda_olhos: [3, "Sufusão conjuntival sem exsudado é muito característica."],
    hda_urina: [3, "Oligúria e urina escura sugerem lesão renal (doença de Weil)."],
    hda_febre: [2, "Febre alta de início súbito."],
    hda_pele: [2, "Icterícia define a forma grave."],
    h_alcool: [1, "Afasta hepatite alcoólica."],
    h_sexual: [1, "Afasta hepatite viral de transmissão sexual."],
    ap_med: [1, "AINEs agravam a lesão renal."],
    e_olhos: [3, "Confirma a sufusão conjuntival."],
    e_sv: [2, "Avalia a gravidade (sépsis)."],
    e_pele: [2, "Icterícia e petéquias."],
    e_mi: [2, "Dor dos gémeos."],
    e_abd: [2, "Hepatomegalia; afasta abdómen cirúrgico."]
  },
  indicados: {
    t_serolep: [3, "Confirma o diagnóstico."],
    t_bioq: [3, "Lesão renal aguda define a doença de Weil."],
    t_hep: [3, "Hiperbilirrubinemia com transaminases pouco elevadas."],
    t_hemo: [2, "Trombocitopenia e neutrofilia."],
    t_ck: [2, "CK elevada (miosite)."],
    t_urina: [2, "Proteinúria e hematúria."],
    t_hemoc: [1, "Úteis na 1.ª semana."],
    t_pcr: [1, "Marcador inflamatório."]
  },
  errados: {
    t_esfreg: "Sem viagem a zona endémica, a malária não é hipótese."
  },
  hip: [["Leptospirose", 2], ["Hepatite viral aguda", 1], ["Sépsis bacteriana", 1], ["Colangite aguda", 1], ["Malária", 0], ["Dengue", 0]],
  dx: [
    ["Leptospirose grave – doença de Weil (icterícia + lesão renal aguda + trombocitopenia)", true, "Exposição a água doce, sufusão conjuntival, mialgias, icterícia e lesão renal; IgM positiva."],
    ["Hepatite A", false, "Não explica a lesão renal, a CK elevada nem a sufusão conjuntival."],
    ["Febre escaro-nodular", false, "Sem escara nem exantema."],
    ["Colangite aguda", false, "Vias biliares não dilatadas."],
    ["Rabdomiólise de esforço", false, "Não explica a febre nem a icterícia."]
  ],
  tx: [
    ["Internar: penicilina G ou ceftriaxona EV, hidratação e vigilância da função renal", true, "Forma grave: antibiótico EV e suporte (diálise se necessário)."],
    ["Doxiciclina oral em ambulatório", false, "Doxiciclina oral é para formas ligeiras; esta é grave."],
    ["Anti-inflamatórios e repouso", false, "AINEs agravam a lesão renal e não tratam a infeção."],
    ["Aciclovir EV", false, "Não é uma infeção vírica."]
  ],
  aprender: ["Em febre com icterícia e lesão renal, perguntar sempre por água doce, ratos e profissão.", "Sufusão conjuntival sem exsudado é quase assinatura da leptospirose.", "Na 1.ª semana a bactéria está no sangue; a partir da 2.ª, na urina."]
},
{
  id: "bruce", tema: "zoonoses", area: "Infecciologia", titulo: "Brucelose",
  doente: "Homem, 52 anos", local: "Consulta",
  queixa: "Febre que vai e vem há cerca de 4 semanas.",
  a: {
    hda_inicio: "Há cerca de um mês. Tenho dias com febre e outros sem.",
    hda_carater: "Ando muito cansado e sem apetite.",
    hda_evol: "Passo uns dias bem e depois volta.",
    hda_febre: "Febre ao fim da tarde até 39 ºC, que vai e vem.",
    hda_sudor: "Suo muito à noite; a cama fica encharcada e com um cheiro estranho, ácido.",
    hda_mialg: "Dores nas costas, na zona lombar, e nos joelhos.",
    hda_peso: "Perdi uns 5 kg.",
    hda_urina: "Urina normal, mas tenho um testículo inchado e dorido há uma semana.",
    h_prof: "Sou pastor de cabras e ovelhas; ajudo nos partos dos animais.",
    h_alim: "Como queijo fresco feito por nós, de leite de cabra cru.",
    h_animais: "Cabras e ovelhas; algumas abortaram este ano.",
    h_viagens: "Não saio da aldeia.",
    h_picadas: "Não reparei em carraças.",
    ap_tb: "Que eu saiba, nunca."
  },
  ex: {
    e_geral: "Emagrecido, orientado.",
    e_sv: "PA 124/78 mmHg, FC 96 bpm, FR 16 cpm, T 38,6 ºC.",
    e_abd: "Hepatomegalia ligeira e esplenomegalia palpável.",
    e_ganglios: "Adenopatias cervicais pequenas e móveis.",
    e_cardio: "S1 e S2 rítmicos, sem sopros.",
    e_pele: "Sem exantema nem lesões."
  },
  t: {
    t_hemo: "Leucócitos 3 600/µL (leucopenia), Hb 11,8 g/dL, plaquetas 160 000/µL.",
    t_pcr: "PCR 6 mg/dL.",
    t_hep: "AST/ALT 2× o normal; bilirrubina normal.",
    t_wright: "Rosa de Bengala positiva; reação de Wright 1/640.",
    t_hemoc: "Brucella melitensis (cultura com incubação prolongada).",
    t_ecoabd: "Hepatoesplenomegalia homogénea.",
    t_rx: "Sem alterações.",
    t_urina: "Sem alterações."
  },
  chave: {
    h_prof: [3, "Contacto com gado (partos, abortos) é a principal via."],
    h_alim: [3, "Queijo ou leite crus de cabra/ovelha."],
    h_animais: [2, "Abortos nos animais sugerem brucelose no rebanho."],
    hda_febre: [3, "Febre ondulante é característica."],
    hda_sudor: [3, "Sudorese noturna profusa com cheiro característico."],
    hda_mialg: [2, "Lombalgia sugere sacroileíte ou espondilite."],
    hda_peso: [1, "Sintoma constitucional."],
    hda_urina: [2, "Epididimo-orquite é uma forma focal."],
    ap_tb: [1, "Tuberculose é o principal diagnóstico diferencial."],
    h_viagens: [1, "Afasta doenças do viajante."],
    e_abd: [3, "Hepatoesplenomegalia (sistema reticuloendotelial)."],
    e_cardio: [2, "Endocardite é a principal causa de morte."],
    e_sv: [2, "Documentar a febre."],
    e_ganglios: [1, "Adenopatias."]
  },
  indicados: {
    t_wright: [3, "Teste específico para Brucella."],
    t_hemoc: [3, "Isolamento do agente (incubação prolongada)."],
    t_hemo: [2, "Leucopenia e anemia ligeira."],
    t_hep: [2, "Atingimento hepático."],
    t_pcr: [1, "Marcador inflamatório."],
    t_ecoabd: [1, "Documenta a hepatoesplenomegalia."]
  },
  errados: {},
  hip: [["Brucelose", 2], ["Tuberculose", 1], ["Linfoma", 1], ["Febre Q", 1], ["Endocardite infecciosa", 1], ["Leptospirose", 0]],
  dx: [
    ["Brucelose aguda (B. melitensis) com epididimo-orquite", true, "Pastor, queijo cru, febre ondulante, sudorese com cheiro, hepatoesplenomegalia; Wright e hemocultura positivos."],
    ["Tuberculose disseminada", false, "As serologias e a hemocultura confirmam Brucella."],
    ["Febre Q", false, "Não há pneumonia e o agente isolado é Brucella."],
    ["Linfoma de Hodgkin", false, "O agente infeccioso foi isolado."],
    ["Mononucleose infecciosa", false, "Idade, epidemiologia e serologias apontam para brucelose."]
  ],
  tx: [
    ["Doxiciclina 6 semanas + rifampicina (ou gentamicina nos primeiros 7 dias); declarar a doença", true, "A terapêutica da brucelose é sempre combinada."],
    ["Doxiciclina em monoterapia 10 dias", false, "Monoterapia e duração curta levam a recidivas."],
    ["Amoxicilina-clavulanato", false, "Não cobre Brucella (intracelular)."],
    ["Corticoides para a febre", false, "Não tratam a infeção."]
  ],
  aprender: ["Em febre prolongada, perguntar profissão, animais e alimentos crus.", "Febre ondulante + sudorese com cheiro + hepatoesplenomegalia = brucelose até prova em contrário.", "Tratamento sempre combinado e prolongado."]
},
{
  id: "fen", tema: "zoonoses", area: "Infecciologia", titulo: "Febre escaro-nodular",
  doente: "Mulher, 45 anos", local: "Serviço de Urgência (julho)",
  queixa: "Febre alta e manchas no corpo há 2 dias.",
  a: {
    hda_inicio: "Há 4 dias, febre de repente; as manchas apareceram há 2 dias.",
    hda_carater: "Estou abatida, com febre e o corpo cheio de manchas.",
    hda_febre: "Febre de 39,5 ºC com arrepios.",
    hda_cefaleia: "Dor de cabeça intensa.",
    hda_mialg: "Dores nas articulações e nos músculos.",
    hda_pele: "Manchas vermelhas que começaram nas pernas e se espalharam, até às palmas das mãos e plantas dos pés; não dão comichão. Tenho também uma ferida escura na perna há uma semana.",
    hda_olhos: "Olhos um pouco vermelhos.",
    h_animais: "Tenho dois cães no quintal e tiro-lhes muitas carraças.",
    h_picadas: "Não me lembro de ser picada, mas tiro as carraças aos cães com as mãos.",
    h_viagens: "Não viajei.",
    ap_alerg: "Não tenho alergias."
  },
  ex: {
    e_geral: "Prostrada, orientada.",
    e_sv: "PA 112/70 mmHg, FC 100 bpm, FR 18 cpm, T 39,1 ºC.",
    e_pele: "Exantema maculopapular generalizado, incluindo palmas e plantas. Na face posterior da perna direita, lesão crostosa negra de 1 cm com halo eritematoso.",
    e_ganglios: "Adenopatia inguinal direita dolorosa.",
    e_abd: "Hepatomegalia ligeira.",
    e_olhos: "Hiperemia conjuntival ligeira.",
    e_meninge: "Sem rigidez da nuca; Kernig e Brudzinski negativos."
  },
  t: {
    t_hemo: "Leucócitos 7 900/µL; plaquetas 98 000/µL.",
    t_hep: "AST/ALT 1,5× o normal.",
    t_bioq: "Na+ 132 mmol/L; função renal normal.",
    t_pcr: "PCR 9 mg/dL.",
    t_serorick: "IgG anti-R. conorii 1/128 na 1.ª amostra; repetir em 2–3 semanas para confirmar seroconversão.",
    t_hemoc: "Negativas."
  },
  chave: {
    hda_pele: [3, "Exantema com palmas e plantas + escara é a tríade da doença."],
    h_animais: [3, "Cães com carraças são o vetor habitual."],
    h_picadas: [3, "Contacto com carraças."],
    hda_febre: [2, "Febre alta é um dos três elementos da tríade."],
    h_viagens: [1, "Afasta doenças tropicais."],
    ap_alerg: [1, "Antes de iniciar doxiciclina."],
    hda_cefaleia: [1, "Sintoma frequente."],
    e_pele: [3, "Encontrar a escara negra confirma a suspeita clínica."],
    e_meninge: [2, "Excluir meningite/meningococcemia num doente com febre e exantema."],
    e_ganglios: [2, "Adenopatia regional à escara."],
    e_sv: [2, "Documentar febre e estabilidade."]
  },
  indicados: {
    t_serorick: [3, "Confirma (com 2.ª amostra), mas não se espera por ela para tratar."],
    t_hemo: [2, "Trombocitopenia."],
    t_hep: [2, "Citólise hepática ligeira."],
    t_bioq: [1, "Hiponatremia frequente."],
    t_pcr: [1, "Marcador inflamatório."]
  },
  errados: {
    t_pl: "Sem sinais meníngeos não há indicação para punção lombar."
  },
  hip: [["Febre escaro-nodular (Rickettsia)", 2], ["Meningococcemia", 1], ["Doença de Lyme", 1], ["Exantema vírico", 1], ["Toxidermia", 1], ["Psoríase", 0]],
  dx: [
    ["Febre escaro-nodular (Rickettsia conorii)", true, "Tríade febre + escara negra + exantema com palmas e plantas, num contexto de carraças de cão no verão."],
    ["Doença de Lyme", false, "Lyme dá eritema migratório (em alvo), não escara negra com exantema generalizado."],
    ["Meningococcemia", false, "Sem sinais meníngeos e com escara de inoculação."],
    ["Sarampo", false, "Sem escara; epidemiologia de carraças."],
    ["Sífilis secundária", false, "A escara e a epidemiologia apontam para Rickettsia."]
  ],
  tx: [
    ["Doxiciclina 100 mg de 12/12 h, iniciar já sem esperar pela serologia", true, "Tratamento empírico precoce reduz complicações."],
    ["Esperar pelo resultado da serologia antes de tratar", false, "A serologia demora e precisa de 2.ª amostra: não se atrasa o tratamento."],
    ["Amoxicilina 7 dias", false, "Não cobre bactérias intracelulares."],
    ["Ceftriaxona + vancomicina", false, "Esquema de meningite bacteriana, não indicado."]
  ],
  aprender: ["Em febre com exantema, procurar sempre uma escara de inoculação.", "Perguntar por cães, carraças e época do ano.", "Doxiciclina empírica: não esperar pela serologia."]
},
{
  id: "pcp", tema: "hiv", area: "Infecciologia", titulo: "Pneumocistose em doente com VIH",
  doente: "Homem, 34 anos", local: "Serviço de Urgência",
  queixa: "Tosse seca e falta de ar que pioram há 3 semanas.",
  a: {
    hda_inicio: "Há umas 3 semanas, foi piorando aos poucos.",
    hda_carater: "Tosse seca e cansaço; também tenho uma coisa branca na boca que me custa a engolir.",
    hda_evol: "Cada semana pior.",
    hda_tosse: "Tosse seca, sem expetoração.",
    hda_dispneia: "Agora canso-me a subir um lanço de escadas; antes corria.",
    hda_febre: "Febre baixa, 37,8 ºC à noite.",
    hda_peso: "Perdi 8 kg nos últimos 3 meses sem querer.",
    hda_sudor: "Às vezes.",
    hda_gi: "Tenho tido diarreia há umas semanas.",
    ap_ist: "Nunca fiz o teste do VIH. Tive uma sífilis há 2 anos.",
    h_sexual: "Tenho relações com homens, vários parceiros no último ano, nem sempre uso preservativo.",
    ap_tb: "Não que saiba.",
    h_drogas: "Não consumo.",
    h_viagens: "Não viajei."
  },
  ex: {
    e_geral: "Emagrecido, polipneico ligeiro.",
    e_sv: "PA 118/72 mmHg, FC 104 bpm, FR 26 cpm, T 37,9 ºC.",
    e_spo2: "SpO2 93 % em repouso; desce para 85 % ao caminhar no corredor.",
    e_oro: "Placas esbranquiçadas no palato e na língua que se destacam com a espátula.",
    e_pulm_ausc: "Auscultação quase normal; crepitações finas bibasais escassas.",
    e_ganglios: "Adenopatias cervicais e axilares pequenas, generalizadas.",
    e_pele: "Sem lesões violáceas."
  },
  t: {
    t_rx: "Infiltrado intersticial bilateral difuso, em \"asa de borboleta\"; sem derrame.",
    t_gaso: "PaO2 62 mmHg em ar ambiente; gradiente A-a aumentado.",
    t_ldh: "LDH 520 U/L.",
    t_vih: "Positivo (com consentimento).",
    t_cd4: "CD4 85 células/µL.",
    t_hemo: "Linfopenia; Hb 12,1 g/dL.",
    t_bk: "Exame direto negativo; cultura em curso.",
    t_lba: "Pneumocystis jirovecii identificado.",
    t_pcr: "PCR 4 mg/dL."
  },
  chave: {
    ap_ist: [3, "Nunca ter feito o teste VIH com uma IST prévia é decisivo."],
    h_sexual: [3, "Comportamento de risco para VIH."],
    hda_dispneia: [3, "Dispneia progressiva de esforço é típica da pneumocistose."],
    hda_tosse: [2, "Tosse seca (pneumonia atípica)."],
    hda_peso: [2, "Perda de peso sugere imunodepressão avançada."],
    hda_inicio: [2, "Evolução subaguda (semanas)."],
    ap_tb: [2, "Tuberculose é o principal diferencial no VIH."],
    hda_febre: [1, "Febre baixa."],
    hda_gi: [1, "Diarreia crónica é frequente no VIH avançado."],
    e_oro: [3, "Candidíase oral denuncia imunodepressão."],
    e_spo2: [3, "Dessaturação no esforço é muito sugestiva de Pneumocystis."],
    e_pulm_ausc: [2, "Auscultação pobre para a hipoxemia."],
    e_ganglios: [1, "Linfadenopatia generalizada."],
    e_sv: [2, "Taquipneia."]
  },
  indicados: {
    t_vih: [3, "Diagnóstico de base."],
    t_cd4: [3, "CD4 < 200 define SIDA e o risco de Pneumocystis."],
    t_rx: [3, "Infiltrado bilateral difuso."],
    t_gaso: [3, "PaO2 < 70 indica corticoides."],
    t_lba: [3, "Confirma Pneumocystis."],
    t_ldh: [2, "LDH elevada é característica."],
    t_bk: [2, "Excluir tuberculose."],
    t_hemo: [1, "Linfopenia."]
  },
  errados: {},
  hip: [["Pneumocistose num doente com VIH", 2], ["Tuberculose pulmonar", 1], ["Pneumonia bacteriana", 1], ["Pneumonite a CMV", 1], ["Asma", 0], ["Insuficiência cardíaca", 0]],
  dx: [
    ["Pneumonia por Pneumocystis jirovecii – infeção VIH em estádio SIDA (CD4 < 200)", true, "Dispneia subaguda, dessaturação no esforço, LDH alta, infiltrado bilateral e CD4 85."],
    ["Tuberculose pulmonar", false, "BAAR negativo e Pneumocystis identificado."],
    ["Sarcoma de Kaposi pulmonar", false, "Sem lesões cutâneas violáceas e com agente identificado."],
    ["PAC por pneumococo", false, "Quadro subagudo, tosse seca e infiltrado intersticial bilateral."],
    ["Linfoma", false, "O agente infeccioso foi identificado."]
  ],
  tx: [
    ["TMP-SMX 21 dias + corticoide (PaO2 < 70); iniciar TARV nas 2 semanas seguintes", true, "Tratar a infeção oportunista e iniciar TARV sem atrasar demasiado."],
    ["Iniciar TARV hoje e TMP-SMX só se piorar", false, "Tratar primeiro a infeção oportunista; TARV imediata aumenta o risco de IRIS."],
    ["Azitromicina oral", false, "Não trata Pneumocystis."],
    ["RIPE empírico", false, "A tuberculose foi afastada e o agente é Pneumocystis."]
  ],
  aprender: ["Em dispneia subaguda num adulto jovem, perguntar sempre pelo teste VIH e comportamentos de risco.", "Candidíase oral e dessaturação no esforço são pistas fortes.", "TCD4 < 200 → profilaxia com TMP-SMX."]
},
{
  id: "tb", tema: "tb", area: "Infecciologia", titulo: "Tuberculose pulmonar ativa",
  doente: "Homem, 41 anos", local: "Serviço de Urgência",
  queixa: "Tosse há 2 meses; ontem tossiu sangue.",
  a: {
    hda_inicio: "A tosse começou há uns 2 meses e nunca mais passou.",
    hda_carater: "Tosse e cansaço; ando sem forças.",
    hda_evol: "Foi piorando devagar; ontem deitei sangue.",
    hda_tosse: "Tosse com expetoração amarelada, sobretudo de manhã.",
    hda_hemopt: "Ontem e hoje deitei sangue vivo com a tosse, mais ou menos uma colher de sopa.",
    hda_febre: "Febre baixa ao fim do dia.",
    hda_sudor: "Acordo encharcado em suor quase todas as noites.",
    hda_peso: "Perdi uns 7 kg; as calças estão largas.",
    hda_dispneia: "Pouca.",
    ap_tb: "O meu colega de quarto esteve internado com tuberculose há 6 meses.",
    ap_ist: "Nunca fiz o teste do VIH.",
    h_prof: "Trabalho na construção civil; vivo numa casa partilhada com mais 5 pessoas.",
    h_alcool: "Bebo 4 a 5 cervejas por dia.",
    h_tabaco: "Fumo um maço por dia há 20 anos.",
    h_viagens: "Vim da Índia há 3 anos."
  },
  ex: {
    e_geral: "Emagrecido (IMC 18 kg/m²).",
    e_sv: "PA 120/76 mmHg, FC 92 bpm, FR 18 cpm, T 37,9 ºC.",
    e_spo2: "SpO2 96 % em ar ambiente.",
    e_pulm_ausc: "Crepitações e sopro anfórico no vértice direito.",
    e_pulm_perc: "Ligeira macicez no vértice direito."
  },
  t: {
    t_rx: "Cavitação no lobo superior direito com infiltrado envolvente.",
    t_bk: "Exame direto: BAAR +++. PCR M. tuberculosis positiva, sem mutação de resistência à rifampicina. Cultura em curso.",
    t_vih: "Negativo.",
    t_hemo: "Hb 12,4 g/dL; leucócitos normais.",
    t_hep: "Função hepática basal normal.",
    t_bioq: "Função renal normal.",
    t_igra: "Positivo.",
    t_pcr: "PCR 5 mg/dL."
  },
  chave: {
    hda_inicio: [3, "Tosse > 3 semanas obriga a pensar em tuberculose."],
    hda_hemopt: [2, "Hemoptise."],
    hda_sudor: [3, "Sudorese noturna (FESTA)."],
    hda_peso: [3, "Emagrecimento (FESTA)."],
    hda_febre: [2, "Febre vespertina (FESTA)."],
    ap_tb: [3, "Contacto com doente bacilífero."],
    ap_ist: [2, "Todo o doente com tuberculose deve fazer teste VIH."],
    h_prof: [1, "Coabitação em espaço sobrelotado."],
    h_viagens: [2, "Origem de país com alta incidência."],
    h_tabaco: [1, "Diferencial com neoplasia do pulmão."],
    h_alcool: [1, "Fator de risco e de hepatotoxicidade dos antibacilares."],
    e_pulm_ausc: [3, "Achados no vértice (reativação nos lobos superiores)."],
    e_geral: [2, "Emagrecimento."],
    e_sv: [1, "Febre."]
  },
  indicados: {
    t_bk: [3, "Diagnóstico: exame direto, PCR (resistências) e cultura (gold-standard)."],
    t_rx: [3, "Cavitação no lobo superior."],
    t_vih: [3, "Rastreio de VIH em todos os doentes com tuberculose."],
    t_hep: [2, "Basal antes de antibacilares hepatotóxicos."],
    t_hemo: [1, "Basal."],
    t_bioq: [1, "Basal."]
  },
  errados: {
    t_igra: "O IGRA não distingue infeção latente de doença ativa: não serve para diagnosticar tuberculose ativa."
  },
  hip: [["Tuberculose pulmonar", 2], ["Neoplasia do pulmão", 1], ["Pneumonia", 1], ["Abcesso pulmonar", 1], ["Bronquiectasias", 1], ["Asma", 0]],
  dx: [
    ["Tuberculose pulmonar ativa bacilífera", true, "FESTA, contacto, cavitação apical e BAAR +++."],
    ["Carcinoma epidermoide do pulmão", false, "BAAR +++ e PCR positiva confirmam tuberculose."],
    ["Tuberculose latente", false, "Há doença ativa (sintomas, cavitação, bacilos)."],
    ["Abcesso pulmonar", false, "Bacilos identificados; quadro de 2 meses com FESTA."],
    ["Sarcoidose", false, "Agente identificado."]
  ],
  tx: [
    ["Isolamento respiratório; RIPE 2 meses + RI 4 meses (com piridoxina); rastreio de contactos", true, "Esquema padrão; bacilífero tem de ficar isolado e os contactos rastreados."],
    ["Isoniazida 9 meses", false, "Esse é o tratamento da infeção latente."],
    ["Amoxicilina-clavulanato e reavaliar", false, "Atrasa o tratamento de uma tuberculose bacilífera."],
    ["RIPE em ambulatório sem isolamento nem rastreio de contactos", false, "Doente muito contagioso (BAAR +++): isolar e rastrear contactos."]
  ],
  aprender: ["Tosse > 3 semanas: perguntar pela FESTA.", "Pedir teste VIH a todos os doentes com tuberculose.", "IGRA serve para infeção latente, não para diagnosticar doença ativa."]
},
{
  id: "ea", tema: "sincope", area: "Cardiovascular", titulo: "Síncope por estenose aórtica",
  doente: "Homem, 76 anos", local: "Serviço de Urgência",
  queixa: "Desmaiou enquanto subia uma rua inclinada.",
  a: {
    hda_inicio: "Foi hoje de manhã. Nunca me tinha acontecido.",
    hda_carater: "Apaguei de repente.",
    hda_sincope: "Ia a subir a rua com os sacos das compras e apaguei de repente, sem sentir nada antes. Acordei no chão em segundos e logo bem orientado.",
    hda_dortor: "Às vezes, quando faço esforço, sinto um aperto no peito que passa quando paro.",
    hda_dispneia: "Canso-me mais do que antes a subir escadas, há uns meses.",
    hda_neuro: "Não fiquei com fraqueza nem dificuldade a falar. Não mordi a língua nem perdi urina, e ninguém viu convulsões.",
    hda_palp: "Não senti palpitações.",
    ap_cronicas: "Tensão alta e colesterol.",
    ap_med: "Amlodipina e sinvastatina.",
    af_cv: "O meu pai morreu de repente aos 80 anos."
  },
  ex: {
    e_geral: "Vígil, orientado, com escoriação na testa.",
    e_sv: "PA 112/88 mmHg (pressão de pulso reduzida), FC 72 bpm rítmico, FR 16 cpm.",
    e_cardio: "Sopro sistólico de ejeção grau 3/6, rude, em crescendo-decrescendo, no foco aórtico, irradiando para as carótidas; S2 diminuído.",
    e_pulsos: "Pulso carotídeo de pequena amplitude e ascensão lenta (parvus et tardus).",
    e_ortost: "Sem hipotensão ortostática.",
    e_neuro: "Sem défices focais."
  },
  t: {
    t_ecg: "Ritmo sinusal; critérios de hipertrofia ventricular esquerda; sem bloqueios.",
    t_eco: "Estenose aórtica grave calcificada: área valvular 0,7 cm², gradiente médio 52 mmHg; FEVE preservada.",
    t_hemo: "Hb 14 g/dL.",
    t_bioq: "Função renal e ionograma normais; glicemia 98 mg/dL.",
    t_trop: "Troponina negativa.",
    t_holter: "Ritmo sinusal, sem pausas nem arritmias.",
    t_tilt: "Não realizado: o cardiologista recusa o exame (contraindicado).",
    t_tccr: "Sem alterações agudas."
  },
  chave: {
    hda_sincope: [3, "Síncope de esforço sem pródromo aponta para causa cardíaca."],
    hda_dortor: [3, "Angina de esforço: tríade da estenose aórtica (angina, síncope, dispneia)."],
    hda_dispneia: [3, "Dispneia de esforço completa a tríade."],
    hda_neuro: [2, "Afasta crise epilética e AVC (sem mordedura, incontinência ou défices)."],
    hda_palp: [1, "Palpitações sugeririam arritmia."],
    ap_med: [2, "Vasodilatadores podem causar síncope (e são perigosos na estenose aórtica)."],
    af_cv: [1, "Morte súbita familiar."],
    e_cardio: [3, "Sopro de ejeção irradiado às carótidas."],
    e_pulsos: [2, "Pulso parvus et tardus."],
    e_ortost: [2, "Exclui hipotensão ortostática."],
    e_sv: [2, "Pressão de pulso reduzida."],
    e_neuro: [2, "Exclui causa neurológica."]
  },
  indicados: {
    t_ecg: [3, "Obrigatório em toda a síncope."],
    t_eco: [3, "Confirma e quantifica a estenose aórtica."],
    t_hemo: [1, "Excluir anemia."],
    t_bioq: [1, "Glicemia e ionograma."],
    t_trop: [1, "Excluir isquemia aguda."]
  },
  errados: {
    t_tilt: "O teste de tilt está contraindicado na estenose aórtica.",
    t_tccr: "Sem sinais neurológicos, a TC crânio-encefálica não está indicada na síncope."
  },
  hip: [["Síncope cardíaca por estenose aórtica", 2], ["Arritmia / bloqueio AV", 1], ["Hipotensão ortostática", 1], ["Síncope vasovagal", 1], ["Crise epilética", 1], ["AVC", 0]],
  dx: [
    ["Síncope de esforço por estenose aórtica grave", true, "Síncope de esforço sem pródromo + angina + dispneia; sopro de ejeção e pulso parvus et tardus; eco confirma."],
    ["Síncope vasovagal", false, "Sem pródromo e durante esforço: não é reflexa."],
    ["Hipotensão ortostática pela amlodipina", false, "Prova ortostática negativa."],
    ["Bloqueio AV de 3.º grau", false, "ECG e Holter sem bloqueios."],
    ["Crise epilética", false, "Recuperação imediata, sem mordedura nem incontinência."]
  ],
  tx: [
    ["Referenciar para substituição valvular (cirúrgica ou TAVI); evitar esforços e vasodilatadores", true, "Estenose aórtica grave sintomática tem indicação para substituição valvular."],
    ["Tranquilizar: síncope reflexa sem seguimento", false, "É uma síncope cardíaca, com pior prognóstico."],
    ["Teste de tilt para confirmar", false, "Contraindicado na estenose aórtica."],
    ["Iniciar beta-bloqueante e reavaliar em 3 meses", false, "Não trata a obstrução e atrasa a cirurgia."]
  ],
  aprender: ["Na síncope, a primeira pergunta é: foi em esforço e sem pródromo? Se sim, pensar em causa cardíaca.", "ECG em todos; eco se houver sopro.", "Tríade da estenose aórtica: angina, síncope e dispneia de esforço."]
},
{
  id: "conn", tema: "hta", area: "Cardiovascular", titulo: "Hiperaldosteronismo primário",
  doente: "Mulher, 38 anos", local: "Consulta",
  queixa: "Tensão alta que não baixa apesar de 3 medicamentos.",
  a: {
    hda_inicio: "Descobriram há 2 anos, aos 36. Fui aumentando os comprimidos e continua alta.",
    hda_carater: "Sinto-me fraca, com cãibras nas pernas, sobretudo à noite.",
    hda_evol: "As medições em casa estão sempre acima de 160.",
    hda_urina: "Levanto-me 2 ou 3 vezes à noite para urinar.",
    hda_cefaleia: "Algumas dores de cabeça de manhã.",
    hda_palp: "Não tenho crises de palpitações com suores e dor de cabeça.",
    hda_peso: "O peso está estável.",
    hda_sono: "Durmo bem e não ressono.",
    hda_mialg: "Cãibras e fraqueza muscular nas pernas.",
    ap_med: "Amlodipina 10 mg, ramipril 10 mg e indapamida 1,5 mg. Tomo sempre, nunca falho. Não tomo pílula nem anti-inflamatórios.",
    h_alcool: "Não bebo.",
    h_drogas: "Não.",
    h_alim: "Faço pouco sal.",
    af_cv: "Ninguém na família teve tensão alta tão nova."
  },
  ex: {
    e_geral: "Bom estado geral, IMC 23 kg/m².",
    e_sv: "PA 168/104 mmHg (média de 3 medições), FC 70 bpm rítmico.",
    e_pa4: "PA semelhante nos dois braços; pulsos femorais presentes e simétricos, sem atraso braço-perna.",
    e_abd: "Sem sopros abdominais nem massas.",
    e_pele: "Sem estrias violáceas nem fácies cushingoide.",
    e_fundo: "Estreitamento arteriolar e cruzamentos arteriovenosos (retinopatia hipertensiva).",
    e_cardio: "Sem sopros; choque da ponta no lugar."
  },
  t: {
    t_bioq: "K+ 2,9 mmol/L; Na+ 144 mmol/L; creatinina normal; glicemia normal.",
    t_aldo: "Aldosterona elevada com renina suprimida: razão aldosterona/renina muito aumentada.",
    t_tcsr: "Nódulo de 1,8 cm na suprarrenal esquerda (adenoma).",
    t_ecg: "Hipertrofia ventricular esquerda; ondas U.",
    t_urina: "Sem proteinúria.",
    t_gaso: "Alcalose metabólica ligeira.",
    t_tsh: "Normal.",
    t_hemo: "Normal.",
    t_ecorenal: "Artérias renais sem estenoses."
  },
  chave: {
    hda_inicio: [3, "HTA antes dos 40 anos e resistente aponta para causa secundária."],
    ap_med: [3, "Confirmar adesão (pseudo-resistência) e excluir fármacos que sobem a PA."],
    hda_carater: [3, "Fraqueza e cãibras sugerem hipocaliemia."],
    hda_urina: [2, "Poliúria e noctúria (hipocaliemia)."],
    hda_palp: [2, "Afasta feocromocitoma."],
    hda_sono: [1, "Afasta apneia do sono."],
    hda_peso: [1, "Afasta Cushing."],
    h_alcool: [1, "Álcool sobe a PA."],
    h_alim: [1, "Excesso de sal."],
    e_sv: [2, "Confirmar com medição correta."],
    e_pa4: [2, "Exclui coartação da aorta."],
    e_abd: [2, "Sopro abdominal sugeriria estenose da artéria renal."],
    e_pele: [2, "Exclui Cushing."],
    e_fundo: [1, "Lesão de órgão-alvo."]
  },
  indicados: {
    t_bioq: [3, "Hipocaliemia é a pista."],
    t_aldo: [3, "Razão aldosterona/renina é o rastreio do hiperaldosteronismo primário."],
    t_tcsr: [2, "Depois da bioquímica, localizar o adenoma."],
    t_ecg: [1, "Lesão de órgão-alvo."],
    t_urina: [1, "Avaliação de rotina da HTA."],
    t_tsh: [1, "Avaliação de HTA secundária."]
  },
  errados: {
    t_ecorenal: "Com renina suprimida, a estenose da artéria renal (renina alta) fica afastada."
  },
  hip: [["Hiperaldosteronismo primário", 2], ["Estenose da artéria renal / displasia fibromuscular", 1], ["Feocromocitoma", 1], ["Síndrome de Cushing", 1], ["HTA essencial mal controlada", 1], ["Coartação da aorta", 1]],
  dx: [
    ["Hiperaldosteronismo primário por adenoma da suprarrenal (síndrome de Conn)", true, "HTA jovem resistente, hipocaliemia, aldosterona alta com renina baixa e adenoma na TC."],
    ["Displasia fibromuscular da artéria renal", false, "Renina suprimida e artérias renais normais."],
    ["Feocromocitoma", false, "Sem crises adrenérgicas; bioquímica aponta para aldosterona."],
    ["HTA essencial resistente", false, "Há uma causa secundária identificada."],
    ["Síndrome de Cushing", false, "Sem fenótipo cushingoide."]
  ],
  tx: [
    ["Corrigir o potássio, iniciar espironolactona e referenciar para suprarrenalectomia", true, "O adenoma produtor de aldosterona trata-se com cirurgia; espironolactona até lá."],
    ["Juntar um 4.º anti-hipertensor e reavaliar em 6 meses", false, "Ignora a causa tratável."],
    ["Aumentar a indapamida", false, "Agrava a hipocaliemia."],
    ["Angioplastia da artéria renal", false, "Não há estenose da artéria renal."]
  ],
  aprender: ["HTA antes dos 30–40 anos ou resistente: procurar causa secundária.", "Hipocaliemia + HTA = pedir aldosterona e renina.", "Confirmar sempre a adesão antes de chamar resistente à HTA."]
},
{
  id: "malaria", tema: "viajante", area: "Infecciologia", titulo: "Malária grave por P. falciparum",
  doente: "Homem, 42 anos", local: "Serviço de Urgência",
  queixa: "Febre alta com calafrios há 3 dias.",
  a: {
    hda_inicio: "Há 3 dias, começou com calafrios fortíssimos e depois febre alta.",
    hda_carater: "Calafrios a tremer, depois febre e muito suor.",
    hda_evol: "Vai e vem várias vezes por dia; hoje estou pior.",
    hda_febre: "Febre até 40 ºC, com calafrios e depois suores intensos.",
    hda_cefaleia: "Muita dor de cabeça.",
    hda_mialg: "Dores no corpo todo.",
    hda_gi: "Náuseas e vomitei duas vezes.",
    hda_urina: "Hoje a urina está muito escura, tipo coca-cola.",
    hda_neuro: "A minha mulher diz que estou mais lento a responder.",
    hda_pele: "A minha mulher acha que estou amarelado.",
    h_viagens: "Voltei há 12 dias de Angola; estive lá um mês a trabalhar numa obra.",
    ap_vacinas: "Fiz a vacina da febre amarela. Levei comprimidos para a malária mas deixei de os tomar a meio porque me davam náuseas.",
    h_picadas: "Fui muito picado por mosquitos, sobretudo ao fim do dia.",
    h_prof: "Engenheiro civil.",
    h_sexual: "Não tive relações fora do casamento.",
    h_agua: "Não tomei banho em rios."
  },
  ex: {
    e_geral: "Prostrado e sonolento, mas orientado; responde lentamente (Glasgow 14).",
    e_sv: "PA 98/60 mmHg, FC 118 bpm, FR 24 cpm, T 39,8 ºC.",
    e_pele: "Palidez e icterícia ligeira; sem exantema nem escara.",
    e_olhos: "Escleróticas subictéricas.",
    e_abd: "Esplenomegalia palpável 2 cm abaixo do rebordo costal; hepatomegalia ligeira.",
    e_meninge: "Sem rigidez da nuca.",
    e_neuro: "Sem défices focais."
  },
  t: {
    t_esfreg: "Plasmodium falciparum; parasitemia 6 %.",
    t_hemo: "Hb 9,8 g/dL; plaquetas 45 000/µL; leucócitos normais.",
    t_bioq: "Creatinina 2,4 mg/dL; glicemia 62 mg/dL.",
    t_hep: "Bilirrubina total 4,1 mg/dL; transaminases ligeiramente elevadas.",
    t_gaso: "Acidose metabólica; lactato 4,2 mmol/L.",
    t_hemoc: "Colhidas; negativas.",
    t_urina: "Hemoglobinúria.",
    t_pcr: "PCR 12 mg/dL.",
    t_pl: "Não realizada: plaquetas 45 000/µL e sem sinais meníngeos."
  },
  chave: {
    h_viagens: [3, "Febre após viagem a zona endémica = malária até prova em contrário."],
    ap_vacinas: [3, "Profilaxia incompleta não protege."],
    h_picadas: [2, "Picadas ao entardecer (Anopheles)."],
    hda_febre: [3, "Acessos febris com calafrios e sudorese."],
    hda_neuro: [3, "Alteração da consciência é critério de malária grave."],
    hda_urina: [2, "Urina escura (hemólise)."],
    hda_pele: [2, "Icterícia."],
    h_agua: [1, "Afasta leptospirose e esquistossomose."],
    h_sexual: [1, "Afasta infeção VIH aguda."],
    e_geral: [3, "Avaliar o estado de consciência."],
    e_abd: [2, "Esplenomegalia."],
    e_sv: [2, "Gravidade (hipotensão, taquicardia)."],
    e_meninge: [2, "Excluir meningite."],
    e_pele: [1, "Palidez e icterícia."]
  },
  indicados: {
    t_esfreg: [3, "Gold-standard: identifica a espécie e a parasitemia."],
    t_hemo: [3, "Anemia e trombocitopenia."],
    t_bioq: [2, "Lesão renal e hipoglicemia (critérios de gravidade)."],
    t_gaso: [2, "Acidose e lactato (gravidade)."],
    t_hep: [2, "Hiperbilirrubinemia."],
    t_hemoc: [1, "Excluir bacteriemia associada."]
  },
  errados: {
    t_pl: "Sem sinais meníngeos e com trombocitopenia marcada, a punção lombar não está indicada."
  },
  hip: [["Malária", 2], ["Febre tifoide", 1], ["Dengue", 1], ["Leptospirose", 1], ["Hepatite A", 1], ["Gripe", 0]],
  dx: [
    ["Malária grave por P. falciparum (parasitemia > 5 %, alteração da consciência, lesão renal, hipoglicemia)", true, "Viagem a Angola sem profilaxia completa; esfregaço com P. falciparum e vários critérios de gravidade."],
    ["Malária não complicada por P. vivax", false, "A espécie é falciparum e há critérios de gravidade."],
    ["Dengue grave", false, "O esfregaço mostra Plasmodium."],
    ["Febre tifoide", false, "O esfregaço mostra Plasmodium."],
    ["Leptospirose", false, "Sem exposição a água doce; esfregaço positivo."]
  ],
  tx: [
    ["Internar (UCI) e iniciar artesunato EV; depois completar com terapêutica oral", true, "Malária grave por falciparum: artesunato EV é o tratamento de escolha."],
    ["Atovaquona-proguanil oral em ambulatório", false, "Só para malária não complicada."],
    ["Primaquina isolada", false, "Primaquina elimina hipnozoítos de vivax/ovale; não trata a crise aguda."],
    ["Doxiciclina e aguardar evolução", false, "Atraso fatal numa malária grave."]
  ],
  aprender: ["Em toda a febre, perguntar por viagens nos últimos meses.", "Perguntar se fez profilaxia e se a completou.", "Alteração da consciência, hipoglicemia, lesão renal ou parasitemia > 5 % = malária grave."]
}
];

module.exports = { CASOS_BANK, CASOS };
