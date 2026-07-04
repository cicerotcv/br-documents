# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- CNPJ alfanumérico (padrão): validação, máscara e geração com letras `A-Z` + dígitos
- Opção `legacyOnly` em validator, masker e generator de CNPJ para modo numérico legado

## [0.1.0] - 2026-07-04

### Added

- CPF validator, masker and generator
- CNPJ validator, masker and generator
- Subpath exports for tree-shaking (`br-documents/cpf/validator`, etc.)
- Hybrid API: direct functions (`validateCpf`) and grouped objects (`CpfValidator.validate`)
- Zero runtime dependencies
